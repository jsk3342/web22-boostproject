import styled from 'styled-components';
import { ChangeEvent, useState } from 'react';

export default function SettingForm() {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [tag, setTag] = useState('');
  const [notice, setNotice] = useState('');
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>): void => {
    if (e.target.files && e.target.files[0]) {
      setPreviewImage(URL.createObjectURL(e.target.files[0]));
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
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="방송 제목을 입력해주세요."
            maxLength={100}
          />
          <CharCount>
            <Bold>{title.length}</Bold>
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
          <Input type="text" value={tag} onChange={(e) => setTag(e.target.value)} placeholder="태그 추가하기" />
        </FormCell>
        <FormCell>
          <Label>공지</Label>
          <Input type="text" value={notice} onChange={(e) => setNotice(e.target.value)} placeholder="공지 추가하기" />
        </FormCell>

        <FormCell>
          <Label htmlFor="preview-image-input">미리보기 이미지</Label>
          <ImageUpload>
            <FileInputLabel htmlFor="preview-image-input">
              {previewImage ? (
                <PreviewImage src={previewImage} alt="미리보기 이미지" />
              ) : (
                <PlaceholderImage>
                  <UploadIcon xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14 14" fill="none">
                    <path d="M1 7H13" stroke="#AEB4C2" strokeWidth="1.5" strokeLinecap="round" />
                    <path d="M7 1L7 13" stroke="#AEB4C2" strokeWidth="1.5" strokeLinecap="round" />
                  </UploadIcon>
                  <UploadText>업로드 (1280x720)</UploadText>
                </PlaceholderImage>
              )}
            </FileInputLabel>
            <FileInput id="preview-image-input" type="file" accept="image/*" onChange={handleImageChange} />
          </ImageUpload>
        </FormCell>

        <Button>업데이트</Button>
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
