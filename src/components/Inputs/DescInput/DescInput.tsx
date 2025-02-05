import React, { useState } from 'react';
import styled from '@emotion/styled';
import { UseArticleElement } from 'src/types/article';

interface Props {
  useArticleElement: UseArticleElement;
}

const DescInput: React.FC<Props> = ({ useArticleElement }) => {
  const [currentLength, setCurrentLength] = useState<number>(0);
  const [isError, setError] = useState<boolean>(false);
  const { articleElements, setArticleElement } = useArticleElement();

  const handleOnChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const textLength = e.target.value.length;
    setCurrentLength(textLength);
    if (textLength === 200) return setError(true);

    setArticleElement({ description: e.target.value });
  };

  const onKeyDown = (
    e: React.KeyboardEvent<HTMLTextAreaElement> & HTMLTextAreaElement,
  ) => {
    if (e.key === 'Backspace') {
      if (currentLength < 199) return;
      setError(false);
    }
  };

  const onBlur = () => setError(false);

  return (
    <Wrapper>
      <Length>{currentLength}/200</Length>
      <TextArea
        data-testid="desc-input"
        placeholder="설명글을 작성해주세요"
        maxLength={200}
        onChange={handleOnChange}
        isError={isError}
        onBlur={onBlur}
        onKeyDown={onKeyDown}
        value={articleElements.description}
      />
    </Wrapper>
  );
};

export default DescInput;

interface StyledProps {
  isError: boolean;
}

const Wrapper = styled.div`
  width: 350px;
  height: 150px;
  position: relative;
`;

const Length = styled.span`
  position: absolute;
  top: -32px;
  right: 0px;
  color: #494c56;
  font-size: 0.9rem;
`;

const TextArea = styled.textarea<StyledProps>`
  width: 100%;
  height: 100%;
  border-radius: 4px;
  background: #292b2e;
  border: 1px solid #3c3e44;
  padding: 15px;
  box-sizing: border-box;
  color: #9499a1;
  outline: none;
  font-size: 1rem;
  overflow: hidden;
  ::placeholder {
    color: #494c56;
    font-size: 1rem;
  }
  :after {
    content: '0/200';
    position: absolute;
    color: red;
    right: 0;
    top: 0;
  }
  :focus {
    border: 1px solid #3941ff;
    ${(props) => props.isError && `border: 1px solid #c4001d;`}
  }
  transition: 0.2s ease-in-out;
  resize: none;
  position: relative;
`;
