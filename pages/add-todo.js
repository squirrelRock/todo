// import what we need for home
import { Container } from "@chakra-ui/react";
import Auth from "../components/Auth";
import AddTodo from "../components/AddTodo";

export default function AddToDo() {
  return (
    <Container maxW="7xl">
      <Auth />
      <AddTodo />
    </Container>
  )
};
