import Head from 'next/head';
import { InferGetServerSidePropsType } from 'next';
import IndexView from '../views/IndexView';
import StoreHOC from '../hoc/StoreHOC';

export const getServerSideProps = async () => {
  const res = await fetch('http://api.bitcoincharts.com/v1/markets.json')
  const data: any = await res.json()

  return {
    props: {
      data,
    },
  }
}

function Index({ data }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <div>
      <Head>
        <title>LinkGraph FrontEnd Taks</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <StoreHOC>
        <IndexView list={ data } />
      </StoreHOC>

    </div>
  )
}

export default Index;
