import React, { useState } from 'react';
import {
  ImageUpload,
  Modal,
  Button,
  TagInput,
  DescInput,
} from 'src/components';
import { createArticle } from 'src/apis';
import styled from '@emotion/styled';
import { useSetRecoilState } from 'recoil';
import { openCreateModalStates } from 'src/recoil/permit';
import { useRouter } from 'next/router';

interface Props {
  articleElements: {
    title?: string;
    content?: string;
  };
}

export const CreateArticleModal = ({ articleElements }: Props) => {
  const [imgUrl, setImgUrl] = useState<string>();
  const [description, setDescription] = useState<string>('');
  const [tags, setTags] = useState<string[]>([]);
  const setClose = useSetRecoilState(openCreateModalStates);
  const router = useRouter();

  const handleModalClose = () => {
    setClose(false);
  };

  const checkValidation = () => {
    if (!articleElements.title) return false;
    if (!articleElements.content) return false;
    if (!imgUrl) return false;
    if (description == '') return false;
    return true;
  };

  const handleOnClickSave = async () => {
    if (!checkValidation()) return;
    const res = await createArticle({
      ...articleElements,
      imgUrl,
      description,
      tags,
    });
    if (res.status == 200) router.push('/article');
  };

  return (
    <Modal handleOpenModal={handleModalClose}>
      <>
        <ButtonWrapper data-testid="createArticleModal">
          <H2>글 설정</H2>
          <div>
            <Button
              label="취소"
              buttonType="normal"
              onClick={handleModalClose}
            />
            <Button
              label="저장"
              buttonType="primary"
              onClick={handleOnClickSave}
            />
          </div>
        </ButtonWrapper>
        <Guide>대표이미지</Guide>
        <ImageUpload setImgUrl={setImgUrl} />
        <Guide>태그(최대 3개)</Guide>
        <TagInput values={tags!} onChange={setTags} />
        <Guide>설명글</Guide>
        <DescInput onChange={setDescription} />
      </>
    </Modal>
  );
};

const Guide = styled.h3`
  font-size: 16px;
  font-weight: 600;
  color: #9499a1;
  text-align: left;
  width: 350px;
`;

const ButtonWrapper = styled.div`
  width: 350px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  padding: 24px 42px;
  border-bottom: 1px solid #494c56;
  margin-bottom: 15px;
`;

const H2 = styled.h2`
  color: #e3e3e3;
  margin: 0px;
  font-weight: 400;
`;
