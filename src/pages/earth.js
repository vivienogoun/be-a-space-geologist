import Head from 'next/head';

import useSWR from 'swr';
import Layout from '@components/Layout';
import Section from '@components/Section';
import Container from '@components/Container';
import Map from '@components/Map';

import '../../node_modules/leaflet-geosearch/dist/geosearch.css'

import styles from '@styles/Home.module.scss';
import { useRef, useState } from 'react';
import { Button, Divider, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, ExternalLinkIcon, Image, Link, VStack, useDisclosure } from '@chakra-ui/react';

const DEFAULT_CENTER = [2.393938, 6.353126]
const fetcher = (url) => fetch(url).then(res => res.json())

export default function Home() {

  const [event, setEvent] = useState()
  const events = useSWR('https://eonet.gsfc.nasa.gov/api/v3/events', fetcher)
  const images = useSWR(`https://images-api.nasa.gov/search?q${event?.title.replaceAll(' ', '%20')}=&media_type=image`, fetcher)
  const urls = images.data?.collection?.items.map(item => item.links[0].href)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = useRef()

  if (events.isLoading | images.isLoading) return <div>Chargement...</div>

  return (
    <Layout>
      <Head>
        <title>GeoDesk View</title>
        <meta name="description" content="Visualize all parts of the globe from the confort of your home" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Section>
        <Container>
          {/* <h1 className={styles.title}>
            GeoDesk View
          </h1> */}

          <Map className={styles.homeMap} width="800" height="400" center={DEFAULT_CENTER} zoom={3}>
            {({ TileLayer, Marker, Popup, Tooltip }) => (
              <>
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  // attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
                />
                {
                  events.data.events.map(e => {
                    return <Marker key={e.id} position={e.geometry[0].coordinates}>
                      <Tooltip>{e.title}</Tooltip>
                      <Popup>
                        {e.description}
                        <Button ref={btnRef} colorScheme='blue' onClick={() => {setEvent(e);onOpen()}}>Read more</Button> 
                      </Popup>
                    </Marker>
                  })
                }
              </>
            )}
          </Map>

          <Drawer isOpen={isOpen} placement='left' size={'md'} onClose={onClose} finalFocusRef={btnRef}>
            <DrawerOverlay/>
            <DrawerContent>
              <DrawerCloseButton/>
              <DrawerHeader>{event?.title}</DrawerHeader>
              
              <DrawerBody>
                <a href={event?.sources[0].url} target='_blank'>Source</a>
                <Divider/>
                <VStack>
                  {
                    urls?.map(url => <Image src={url} alt={url} objectFit={'cover'}/>)
                  }
                </VStack>
              </DrawerBody>

              <DrawerFooter>
                <Button variant='outline' mr={3} onClick={onClose}>
                  Cancel
                </Button>
                <Button colorScheme='blue'>Follow</Button>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>

          {/* <p className={styles.description}>
            <code className={styles.code}>npx create-next-app -e https://github.com/colbyfayock/next-leaflet-starter</code>
          </p>

          <p className={styles.view}>
            <Button href="https://github.com/colbyfayock/next-leaflet-starter">Vew on GitHub</Button>
          </p> */}
        </Container>
      </Section>
    </Layout>
  )
}
