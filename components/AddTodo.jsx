// our first react component for our todo app!
// so we can use jsx to make a component load React
import React from "react";
// now lets add a bunch of chakra ui components
import {
    Box,
    Input,
    Button,
    Textarea,
    Stack,
    Select,
    useToast
} from "@chakra-ui/react";
// bring in useAuth from our hooks so we can make sure use logged in for this comp
import useAuth from "../hooks/useAuth";
// bring in addTodo function from our api
import { addTodo } from "../api/todo";

// now lets define a react jsx component
const AddTodo = () => {
    // every form control (text input) we want to associate a react state
    const [title, setTitle] = React.useState("");
    const [description, setDescription] = React.useState("");
    const [status, setStatus] = React.useState("pending");
    const [isLoading, setIsLoading] = React.useState(false);
    const toast = useToast();
    // let's call useAuth()
    const { isLoggedIn, user } = useAuth() || {};
    // let's define a function to run that handles the add todo operation
    const handleTodoCreate = async () => {
        // are we logged in?
        if ( !isLoggedIn ) {
            // show a floating alert
            toast(
                {
                    title: "You must be logged in to create a todo",
                    status: "error",
                    duration: 9000,
                    isClosable: true
                }
            );
            return;
        }
        // if our code continues execution this far, user is logged in
        setIsLoading(true);
        // let's build a object value template
        const todo = {
            title,
            description,
            status,
            userId: user.uid
        };
        // call our api function that should add a new doc to firestore collection
        await addTodo(todo);
        // once we get past the previous, the firestore doc is made (or an error)
        setIsLoading(false);
        setTitle("");
        setDescription("");
        setStatus("pending");
        // show a floaty with status update
        toast(
            {
                title: "To do created",
                status: "success"
            }
        );

    };
    // let's return the markup for this AddTodo JSX component
    return (
        <Box w="40%" margin={"0 auto"} display="block" mt={5}>
            <Stack direction="column">
                <Input 
                    placeholder="Title"
                    value={title}
                    onChange={ (e) => setTitle( e.target.value ) }
                />
                <Textarea
                    placeholder="Description"
                    value={description}
                    onChange={ (e) => setDescription(e.target.value) }
                />
                <Select 
                    value={status} 
                    onChange={ (e) => setStatus(e.target.value) }>
                    <option 
                        value={"pending"} 
                        style={{ color: "yellow", fontWeight: "bold" }} 
                    >
                        Pending
                    </option>
                    <option 
                        value={"completed"} 
                        style={{ color: "green", fontWeight: "bold" }} 
                    >
                        Completed
                    </option>
                </Select>
                <Button
                    onClick={ () => handleTodoCreate() }
                    disabled={ title.length < 1 || description.length <1 || isLoading }
                    colorScheme="teal"
                    variant="solid"
                >
                    Add Todo
                </Button>
            </Stack>
        </Box>
    );
};

// don't forget to export the component function!
export default AddTodo;
