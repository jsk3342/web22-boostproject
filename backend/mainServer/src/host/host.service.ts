import dotenv from 'dotenv';
import path from 'path';
import { Injectable } from '@nestjs/common';
import { S3Client, PutObjectCommand, ObjectCannedACL } from '@aws-sdk/client-s3';
import { hostKeyPairDto } from '../dto/hostKeyPairDto.js';
import { randomKey } from '../util/generator.js';
import { decodeBase64Image } from '../util/util.js';

dotenv.config({ path: path.resolve('../.env') });

// S3Client 생성
const s3Client = new S3Client({
  credentials: {
    accessKeyId: process.env.OBJECT_STORAGE_ACCESS_KEY_ID!,
    secretAccessKey: process.env.OBJECT_STORAGE_SECRET_ACCESS_KEY!
  },
  region: process.env.OBJECT_STORAGE_REGION!,
  endpoint: process.env.OBJECT_STORAGE_ENDPOINT! // 엔드포인트 추가
});

@Injectable()
export class HostService {
  // 스트림 키 및 세션 키 생성
  async generateStreamKey(requestDto: hostKeyPairDto): Promise<Array<string>> {
    dotenv.config({ path: path.resolve('../.env') });
    const streamKey = randomKey(requestDto.userId, process.env.STREAM_KEY_SALT || '');
    const sessionKey = randomKey(requestDto.userId, process.env.SESSION_KEY_SALT || '');
    return [streamKey, sessionKey];
  }

  // Base64 데이터를 S3에 업로드
  async uploadBase64ToS3(base64Data: string, sessionKey: string, fileName: string): Promise<string> {
    try {
      const { buffer, fileType } = decodeBase64Image(base64Data);

      // 올바른 버킷 이름 및 키 설정
      const bucketName = process.env.OBJECT_STORAGE_BUCKET_NAME!;
      const key = `live/${sessionKey}/${fileName}.${fileType}`;

      const params = {
        Bucket: bucketName, // 순수 버킷 이름만 사용
        Key: key, // 파일 키 (경로 포함)
        Body: buffer, // 파일 데이터
        ContentType: fileType, // 파일 MIME 타입
        ACL: 'public-read' as ObjectCannedACL // 파일 공개 여부
      };

      // PutObjectCommand로 파일 업로드
      const command = new PutObjectCommand(params);
      await s3Client.send(command);

      // 업로드된 파일의 URL 반환
      const location = `${process.env.OBJECT_STORAGE_ENDPOINT}/${bucketName}/${key}`;
      return location;
    } catch (error) {
      console.error('Error uploading to S3:', error);
      throw error;
    }
  }
}
