/* eslint-disable @next/next/no-img-element */
import Head from "next/head";
import styled, { css } from "styled-components";
import { space, flexbox, color } from "styled-system";
import {
  ModalProvider,
  Modal,
  useModal,
  ModalTransition,
} from "react-simple-hook-modal";
import { useState } from "react";
import "react-simple-hook-modal/dist/styles.css";

const format = (num) => new Intl.NumberFormat().format(num, "en-US");

const Main = styled.main`
  margin: 15px;
  height: 90vh;
`;

const Hr = styled.hr`
  border: 1px solid #ccc;
`;

const Header = styled.header`
  ${space}
  display: flex;
  align-items: center;
  gap: 10px;
  flex-direction: column;
  line-height: 1;
`;
const Flex = styled.div`
  display: flex;
  ${flexbox}
  ${space}
`;

const TableHeader = styled.section`
  display: flex;
  ${flexbox}
  ${space}
  width: 90%;
  margin: 30px auto 0 auto;
`;

const Text = styled.div`
  ${flexbox}
  ${space}
  ${color}
  font-family: "Quicksand", sans-serif;
  font-size: ${(props) => props.size || 16}px;
  ${(props) =>
    props.light &&
    css`
      font-weight: 300;
    `};
  ${(props) =>
    props.medium &&
    css`
      font-weight: 400;
    `};
  ${(props) =>
    props.bold &&
    css`
      font-weight: 500;
    `}
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
`;
const Name = styled.div`
  ${flexbox}
  ${space}
  font-family: "Quicksand", sans-serif;
  font-size: ${(props) => props.size || 16}px;
  ${(props) =>
    props.light &&
    css`
      font-weight: 300;
    `};
  ${(props) =>
    props.medium &&
    css`
      font-weight: 400;
    `};
  ${(props) =>
    props.bold &&
    css`
      font-weight: 500;
    `}
`;
const Price = styled.div`
  ${flexbox}
  ${space}
  font-family: "Quicksand", sans-serif;
  font-size: ${(props) => props.size || 16}px;
  ${(props) =>
    props.light &&
    css`
      font-weight: 300;
    `};
  ${(props) =>
    props.medium &&
    css`
      font-weight: 400;
    `};
  ${(props) =>
    props.bold &&
    css`
      font-weight: 500;
    `}
`;
const InvoiceContainer = styled.section`
  width: 90%;
  margin: 50px auto 0 auto;

  ${Row} {
    &:first-child {
      margin-bottom: 18px;
      background-color: lightgrey;
    }
    &:not(:first-child) {
      margin-bottom: 12px;
    }
    padding-left: 30px;
    padding-right: 30px;
  }
`;
const InvoiceTotalContainer = styled.section`
  display: flex;
  width: 92%;
  justify-content: flex-end;
`;

const Hours = styled.button`
  padding: 10px 20px;
  background-color: #2ecc71;
  border: 0;
  cursor: pointer;
  color: white;
`;
const Store = styled.button`
  padding: 10px 20px;
  background-color: #3498db;
  border: 0;
  cursor: pointer;
  color: white;
`;
const CloseButton = styled.button`
  padding: 10px 20px;
  background-color: #c0392b;
  border: 0;
  cursor: pointer;
  color: white;
`;

const Input = styled.input`
  border: 1px solid black;
  padding: 10px;
`;

const PaymentOptions = styled.div`
  ${space}
  ${flexbox}
`;

export default function Home() {
  const { isModalOpen, openModal, closeModal } = useModal();
  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState("");
  const [storeName, setStoreName] = useState("");
  const [storePrice, setStorePrice] = useState("");

  const [numberOfHours, setNumberOfHours] = useState(0);
  const [hoursRate, setHoursRate] = useState(0);

  const reset = () => {
    setStoreName("");
    setStorePrice("");
    setNumberOfHours(0);
    setHoursRate(0);
  };

  const addItem = ({ type }) => {
    if (type === "hours") {
      let name = `Organzing - ${numberOfHours} Hours (Rate $ ${hoursRate})`;
      let price = +numberOfHours * +hoursRate;
      setItems([...items, { name, price }]);
    } else if (type === "store") {
      let name = `${storeName}`;
      let price = +storePrice;
      setItems([...items, { name, price }]);
    }
    closeModal();
    reset();
  };

  return (
    <div>
      <Head>
        <title>Space Organzing Invoice Generator</title>
        <meta name="description" content="Space Organzing Invoice Generator" />
        {/* <link rel="icon" href="/favicon.ico" /> */}
      </Head>

      <Main>
        <Header>
          <section>
            <img
              onDoubleClick={openModal}
              src="/spacelogo.png"
              alt="logo"
              width={70}
              height={70}
            />
          </section>
          <section
            style={{
              textAlign: "center",
            }}
          >
            <Text mb={3} light size={26}>
              Space Organzing
            </Text>
            <Text light size={20}>
              INVOICE
            </Text>
          </section>
        </Header>
        <TableHeader flexDirection="column">
          <Flex alignItems="center">
            <Text light size={20}>
              Name:
            </Text>
            <input type={"text"} />
            {/* <Text
              suppressContentEditableWarning={true}
              contentEditable={true}
              light
              size={18}
            >
              John Doe
            </Text> */}
          </Flex>
          <Flex alignItems="center">
            <Text light size={20}>
              Date:
            </Text>
            <input type="date" />
            <input type="date" />
            {/* <Text
              suppressContentEditableWarning={true}
              contentEditable={true}
              light
              size={18}
            >
              01/12/2020 - 01/30/2020
            </Text> */}
          </Flex>
        </TableHeader>
        <br />
        <Hr width="90%" />
        <InvoiceContainer>
          <Row>
            <Name size={18} bold>
              Item
            </Name>
            <Price size={18} bold>
              Amount
            </Price>
          </Row>
          {items.map((item, index) => {
            return (
              <Row key={index}>
                <Name>{item.name}</Name>
                <Price>${item.price}</Price>
              </Row>
            );
          })}
        </InvoiceContainer>
        <br />
        <Hr width="90%" />
        <InvoiceTotalContainer>
          <Flex justifyContent="end">
            <Text pr={2} size={23}>
              Total
            </Text>
            <Text size={23}>
              $
              {format(
                items.reduce(function (acc, current) {
                  return acc + current.price;
                }, 0)
              )}
            </Text>
          </Flex>
        </InvoiceTotalContainer>
        <PaymentOptions mt={30}>
          <Text mb={3} size={16}>
            Payments can be made on Zelle
          </Text>
          <Flex alignItems="center">
            <Text size={16} bold mr={2}>
              Name:
            </Text>
            <Text size={16} color="#74b9ff">
              Space Organizing
            </Text>
          </Flex>
          <Flex alignItems="center">
            <Text size={16} bold mr={2}>
              Email:{" "}
            </Text>
            <Text size={16} color="#74b9ff">
              findyourspacechicago@gmail.com
            </Text>
          </Flex>
        </PaymentOptions>
        <ModalProvider>
          <Modal
            id="any-unique-identifier"
            isOpen={isModalOpen}
            transition={ModalTransition.BOTTOM_UP}
          >
            <Store
              onClick={(e) => {
                setSelectedItem("store");
              }}
            >
              Select Store
            </Store>
            <Hours
              onClick={(e) => {
                setSelectedItem("hours");
              }}
            >
              Select Hours
            </Hours>
            <CloseButton
              onClick={(e) => {
                setSelectedItem("");
                closeModal();
              }}
            >
              Close
            </CloseButton>
            <div>
              {selectedItem === "store" && (
                <div>
                  <div>
                    <div>Name</div>
                    <Input
                      value={storeName}
                      onChange={(e) => {
                        setStoreName(e.target.value);
                      }}
                      type="text"
                    />
                  </div>
                  <div>
                    <div>Price</div>
                    <Input
                      value={storePrice}
                      onChange={(e) => {
                        setStorePrice(e.target.value);
                      }}
                      type="number"
                    />
                  </div>
                  <div>
                    <Store onClick={() => addItem({ type: "store" })}>
                      Add
                    </Store>
                  </div>
                </div>
              )}
            </div>
            <div>
              {selectedItem === "hours" && (
                <div>
                  <div>
                    <div>Hours</div>
                    <Input
                      value={numberOfHours}
                      onChange={(e) => {
                        setNumberOfHours(e.target.value);
                      }}
                      type="number"
                    />
                  </div>
                  <div>
                    <div>Price</div>
                    <Input
                      value={hoursRate}
                      onChange={(e) => {
                        setHoursRate(e.target.value);
                      }}
                      type="number"
                    />
                  </div>
                  <div>
                    <Store onClick={() => addItem({ type: "hours" })}>
                      Add
                    </Store>
                  </div>
                </div>
              )}
            </div>
          </Modal>
        </ModalProvider>
      </Main>
    </div>
  );
}
