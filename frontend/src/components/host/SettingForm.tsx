import styled from 'styled-components';
import { ChangeEvent, useRef, useState } from 'react';
import useUpdateHost from '@apis/queries/host/useUpdateHost';
import { getStoredId } from '@utils/id';
import { convertToBase64 } from '@utils/convertToBase64';

export default function SettingForm() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { mutate: updateHost } = useUpdateHost();

  const [liveTitle, setLiveTitle] = useState('');
  const [category, setCategory] = useState('');
  const [tag, setTag] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [notice, setNotice] = useState('');
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const onRemoveTag = (indexToRemove: number) => {
    setTags((prev) => prev.filter((_, index) => index !== indexToRemove));
  };

  const handleImageChange = async (e: ChangeEvent<HTMLInputElement>): Promise<void> => {
    const files = e.target.files;
    if (!files) return;

    const base64 = await convertToBase64(files[0]);
    setPreviewImage(base64);
  };

  const handleUpdate = () => {
    updateHost({
      userId: getStoredId(),
      liveTitle,
      category,
      defaultThumbnailImageUrl: previewImage || '',
      tags
    });
  };

  const handleImageDelete = () => {
    setPreviewImage(null);

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <Container>
      <FormArea>
        <FormCell>
          <Label>
            방송 제목<Required>*</Required>
          </Label>
          <Input
            type="text"
            value={liveTitle}
            onChange={(e) => setLiveTitle(e.target.value)}
            placeholder="방송 제목을 입력해주세요."
            maxLength={100}
          />
          <CharCount>
            <Bold>{liveTitle.length}</Bold>
            /100
          </CharCount>
        </FormCell>
        <FormCell>
          <Label>카테고리</Label>
          <Input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            placeholder="카테고리 검색"
          />
        </FormCell>
        <FormCell>
          <Label>태그</Label>
          <Flex>
            <Input type="text" value={tag} onChange={(e) => setTag(e.target.value)} placeholder="태그 추가하기" />
            <Button
              onClick={() => {
                setTags((prev) => [...prev, tag.trim()]);
                setTag('');
              }}
            >
              추가
            </Button>
          </Flex>
          {tags.length > 0 && (
            <TagContainer>
              {tags.map((tag, index) => (
                <TagChip key={index}>
                  {tag}
                  <RemoveButton onClick={() => onRemoveTag(index)}>×</RemoveButton>
                </TagChip>
              ))}
            </TagContainer>
          )}
          <UploadText>공백 및 특수 문자 없이 15자까지 입력할 수 있습니다.</UploadText>
        </FormCell>
        <FormCell>
          <Label>공지</Label>
          <Input type="text" value={notice} onChange={(e) => setNotice(e.target.value)} placeholder="공지 추가하기" />
        </FormCell>

        <FormCell>
          <Label>미리보기 이미지</Label>
          <ImageUpload>
            {previewImage ? (
              <ImageContainer>
                <PreviewImage src={previewImage} alt="미리보기 이미지" />
                <ImageActionButtons>
                  <ImageButton as="label" htmlFor="preview-image-input">
                    수정
                  </ImageButton>
                  <ImageButton onClick={handleImageDelete} type="button">
                    삭제
                  </ImageButton>
                </ImageActionButtons>
              </ImageContainer>
            ) : (
              <FileInputLabel htmlFor="preview-image-input">
                <PlaceholderImage>
                  <UploadIcon xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14 14" fill="none">
                    <path d="M1 7H13" stroke="#AEB4C2" strokeWidth="1.5" strokeLinecap="round" />
                    <path d="M7 1L7 13" stroke="#AEB4C2" strokeWidth="1.5" strokeLinecap="round" />
                  </UploadIcon>
                  <UploadText>업로드 (1280x720)</UploadText>
                </PlaceholderImage>
              </FileInputLabel>
            )}
            <FileInput
              ref={fileInputRef}
              id="preview-image-input"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
            />
          </ImageUpload>
        </FormCell>

        <Button onClick={handleUpdate}>업데이트</Button>
      </FormArea>
    </Container>
  );
}

const Container = styled.div`
  background: #ffffff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const Flex = styled.div`
  display: flex;
  gap: 20px;

  input {
    flex: 1;
  }
`;

const FormArea = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const FormCell = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Label = styled.label`
  font-size: 14px;
  color: #525662;
  margin-bottom: 8px;
`;

const Required = styled.em`
  color: #e63a3e;
  margin-left: 4px;
`;

const Input = styled.input`
  padding: 10px;
  border: 1px solid #dddddd;
  border-radius: 4px;
  font-size: 14px;
  outline: none;
  &:focus {
    border-color: #4e41db;
  }
`;

const CharCount = styled.span`
  font-size: 12px;
  color: #9da5b6;
  margin-top: 4px;
  align-self: flex-end;
`;

const Bold = styled.span`
  font-weight: bold;
  color: #000;
`;

const ImageUpload = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 300px;
`;

const FileInputLabel = styled.label`
  cursor: pointer;
  width: 100%;
`;

const FileInput = styled.input`
  display: none;
`;

const PreviewImage = styled.img`
  width: 100%;
  max-width: 300px;
  border-radius: 4px;
  border: 1px solid #dddddd;
`;

const PlaceholderImage = styled.div`
  width: 100%;
  height: 180px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 1px dashed #dddddd;
  border-radius: 4px;
  background-color: #f5f6f8;
`;

const UploadIcon = styled.svg`
  width: 24px;
  height: 24px;
  margin-bottom: 8px;
`;

const UploadText = styled.span`
  font-family: 'NanumGothic', sans-serif;
  font-size: 12px;
  color: #9da5b6;
`;

const Button = styled.button`
  padding: 12px;
  background-color: rgba(78, 65, 219, 0.1);
  color: rgba(78, 65, 219, 0.8);
  border: none;
  border-radius: 7px;
  font-size: 16px;
  cursor: pointer;
  &:hover {
    background-color: rgba(78, 65, 219, 0.2);
  }
`;

const TagContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

const TagChip = styled.span`
  display: inline-flex;
  align-items: center;
  padding: 4px 12px;
  background-color: #f3f4f6;
  border-radius: 9999px;
  font-size: 14px;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #e5e7eb;
  }
`;

const RemoveButton = styled.button`
  margin-left: 8px;
  color: #6b7280;
  font-size: 16px;
  cursor: pointer;
  transition: color 0.2s ease;
  background: none;
  border: none;
  padding: 0 4px;
  line-height: 1;

  &:hover {
    color: #374151;
  }

  &:focus {
    outline: none;
  }
`;

const ImageContainer = styled.div`
  position: relative;
`;

const ImageActionButtons = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 8px;
`;

const ImageButton = styled.button`
  flex: 1;
  padding: 8px;
  background-color: #f3f4f6;
  border: none;
  border-radius: 4px;
  color: #4e41db;
  font-size: 14px;
  cursor: pointer;
  text-align: center;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #e5e7eb;
  }
`;
