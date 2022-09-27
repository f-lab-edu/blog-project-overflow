import React from 'react';
import styled from '@emotion/styled';
import Link from 'next/link';
import Image from 'next/image';

interface Props {
  title: string;
  description: string;
  path: string;
  imgUrl: string;
}

export const Article = ({ title, description, path, imgUrl }: Props) => {
  return (
    <Link href={`/article/${path}`}>
      <Anchor>
        <Container>
          <CustomImage
            src={imgUrl}
            alt="Thumbnail of article"
            width={330}
            height={220}
            layout="responsive"
            // placeholder="blur" NOTE : 추후 blur 부분 작업하기. blurDataURL 부분 추가되어야함
          />
          <Wrapper>
            <Title>{title}</Title>
            <Desc>{description}</Desc>
          </Wrapper>
        </Container>
      </Anchor>
    </Link>
  );
};

const Container = styled.article`
  background-color: #2d2f35;
  width: 350px;
  height: 450px;
  border-radius: 16px;
  padding: 10px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  cursor: pointer;
`;

const Anchor = styled.a`
  text-decoration-line: none;
`;

const CustomImage = styled(Image)`
  border-radius: 16px;
  :hover {
    transform: scale(1.09);
    border-radius: 16px;
  }
  transition: all 0.3s ease-in-out;
`;

const Wrapper = styled.article``;

const Title = styled.h3``;

const Desc = styled.p``;
