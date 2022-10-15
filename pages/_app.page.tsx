import type { AppProps } from 'next/app';
import styled from '@emotion/styled';
import { Global } from '@emotion/react';
import { globalStyles } from 'src/shared';
import { HeaderBar } from 'src/components';
import { useRouter } from 'next/router';
import { RecoilRoot } from 'recoil';

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  return (
    <RecoilRoot>
      <Global styles={globalStyles} />
      <HeaderBar />
      <Container location={router.pathname}>
        <Component {...pageProps} />
      </Container>
      <div id="modal_root"></div>
    </RecoilRoot>
  );
}

export default MyApp;

interface StyleProps {
  location: string;
}

const Container = styled.div<StyleProps>`
  padding-top: 90px;
  ${(props) => props.location == '/write' && 'padding: 30px 50px 0px 50px'};
  height: calc(100vh - 90px);
  box-sizing: border-box;
`;
