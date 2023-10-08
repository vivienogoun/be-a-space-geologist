import Head from 'next/head';

import Layout from '@components/Layout';
import Section from '@components/Section';
import Container from '@components/Container';

import '../../node_modules/leaflet-geosearch/dist/geosearch.css'

import styles from '@styles/Home.module.scss';
import { Button, Flex, Heading, VStack } from '@chakra-ui/react';

export default function Home() {

  return (
    <Layout>
      <Head>
        <title>GeoDesk View</title>
        <meta name="description" content="Visualize all parts of the globe from the confort of your home" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Flex backgroundImage={"url('/images/Earth_rotation.gif')"} backgroundRepeat={'no-repeat'} backgroundSize={'cover'} position={'relative'} overflow={'hidden'} height={'100vh'} direction={'column'} justifyContent={'center'} alignItems={'center'}>
        {/* <video playsInline autoPlay muted loop style={{position: 'absolute', top: 0, left: 0, objectFit: 'cover', height: '100%', width: '100%'}}>
          <source src='/images/w.gif.mp4' type='video/mp4'/>
        </video> */}
        <VStack gap={'20'}>
          <Heading as={'h1'} size={'4xl'} color={'white'}>GeoDesk View</Heading>
          <Heading as={'h2'} size={'2xl'} color={'white'}>Your office, your geological observatory</Heading>
          <Button as={'a'} href='/earth' colorScheme='blue'>Start exploration</Button>
        </VStack>
      </Flex>

      {/* <Section>
        <Container>
          <h1 className={styles.title}>
            GeoDesk View
          </h1>
          
        </Container>
      </Section> */}
    </Layout>
  )
}
