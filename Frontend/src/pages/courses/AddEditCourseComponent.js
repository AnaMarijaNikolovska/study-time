import React, {useEffect, useState} from 'react';
import {
    Box,
    Button,
    ButtonGroup,
    Flex,
    FormControl,
    FormLabel,
    GridItem,
    Heading,
    Input,
    Progress,
    Select,
    Textarea,
} from '@chakra-ui/react';
import {GetAllCategories} from '../../services/CategoryService';
import {AddCourse, EditCourse, UploadFile} from '../../services/CoursesService';
import FileUploader from '../../components/FileUploader';
import {useNavigate} from 'react-router-dom';
import {useAccessTokenState} from "../../context/AccessTokenContext";

const Form1 = ({setStep, setCourseId, courseToEdit}) => {
    const {authUser} = useAccessTokenState();
    const [options, setOptions] = useState(false);
    const [course, setCourse] = useState({
        name: courseToEdit?.name ?? '',
        description: courseToEdit?.description ?? '',
        category_id: courseToEdit?.category_id ?? undefined,
        instructor_id: authUser?.id
    });

    useEffect(() => {
        GetAllCategories().then(r => setOptions(r.data));
    }, [authUser]);

    const handleChange = name => event => {
        setCourse({...course, [name]: event.target.value});
    };


    const handleSubmit = event => {
        event.preventDefault();

        if (courseToEdit) {
            EditCourse(courseToEdit.id, course)
                .then(r => {
                    setCourseId(courseToEdit.id);
                    setStep(2);
                    window.alert("Edited succesfully");
                })

            return;
        }

        AddCourse(course)
            .then((r) => {
                setCourseId(r.data.id);
                setStep(2);
                window.alert('Added succesfully');
            });
    };


    return (
        <form onSubmit={handleSubmit}>
            {!courseToEdit ? <Heading w='100%' textAlign={'center'} fontWeight='normal' mb='2%'>
                Add Course
            </Heading> : null}
            <Flex>
                <FormControl mr='2%'>
                    <FormLabel htmlFor='name' fontWeight={'normal'}>
                        Course Name
                    </FormLabel>
                    <Input id='name' value={course.name} placeholder='Name' onChange={handleChange('name')}/>
                </FormControl>
            </Flex>

            <Flex>
                <FormControl mt='2%'>
                    <FormLabel htmlFor='email' fontWeight={'normal'}>
                        Description for course
                    </FormLabel>
                    <Textarea id='description' value={course.description} type='text'
                              onChange={handleChange('description')}/>
                </FormControl>
            </Flex>

            <br/>
            <FormControl as={GridItem} colSpan={[6, 3]}>
                <FormLabel
                    htmlFor='country'
                    fontSize='sm'
                    fontWeight='md'
                    color='gray.700'
                    _dark={{
                        color: 'gray.50',
                    }}>
                    Category
                </FormLabel>
                <Select
                    id='country'
                    name='country'
                    autoComplete='country'
                    placeholder='Select option'
                    focusBorderColor='brand.400'
                    shadow='sm'
                    size='sm'
                    w='full'
                    onChange={handleChange('category_id')}
                    value={course.category_id}
                    rounded='md'>
                    {options && options.length > 0 && options.map((category, index) =>
                        <option key={index} value={category.id}> {category.name}</option>,
                    )}
                </Select>
            </FormControl>

            <br/>
            <Button
                w='7rem'
                colorScheme='yellow'
                variant='solid'
                type={'submit'}>
                Submit
            </Button>

        </form>
    );
};

const Form2 = ({courseId, setProgress}) => {
    const navigate = useNavigate();
    const [courseFile, setCourseFile] = useState(undefined);

    useEffect(() => {
        setProgress(100);
    }, [])

    const handleSubmit = event => {
        event.preventDefault();

        if (!courseId) {
            window.alert("Course was not set correctly")
        }

        UploadFile(courseId, courseFile)
            .then(() => {
                window.alert('Added succesfully');
                navigate(`/courses/${courseId}`)
            });
    };

    return (
        <form onSubmit={handleSubmit}>
            <Heading w='100%' textAlign={'center'} fontWeight='normal' mb='2%'>
                Course Details
            </Heading>
            <FormControl as={GridItem} colSpan={6}>
                <FormLabel
                    htmlFor='street_address'
                    fontSize='sm'
                    fontWeight='md'
                    color='gray.700'
                    _dark={{
                        color: 'gray.50',
                    }}
                    mt='2%'>
                    Course Video
                </FormLabel>
                <FileUploader file={courseFile} setFile={setCourseFile}/>

            </FormControl>

            <FormControl as={GridItem} colSpan={[6, 6, null, 2]}>
                <FormLabel
                    htmlFor='city'
                    fontSize='sm'
                    fontWeight='md'
                    color='gray.700'
                    _dark={{
                        color: 'gray.50',
                    }}
                    mt='2%'>
                    Other
                </FormLabel>
                <Textarea
                    type='text'
                    name='city'
                    id='city'
                    autoComplete='city'
                    focusBorderColor='brand.400'
                    shadow='sm'
                    size='sm'
                    w='full'
                    rounded='md'
                />
            </FormControl>
            <Flex w='100%' justifyContent='space-between'>
                <Button
                    w='7rem'
                    colorScheme='yellow'
                    variant='solid' type={'submit'}>
                    Submit
                </Button>
            </Flex>
        </form>
    );
};


export default function AddEditCourseComponent({courseToEdit}) {
    const [courseId, setCourseId] = useState(null);
    const [step, setStep] = useState(1);
    const [progress, setProgress] = useState(50);

    return (
        <>
            <Box
                borderWidth='1px'
                rounded='lg'
                shadow='1px 1px 3px rgba(0,0,0,0.3)'
                maxWidth={800}
                p={6}
                m='10px auto'>
                <Progress hasStripe value={progress} mb='5%' mx='5%' colorScheme={'teal'} borderRadius={'20px'}
                          isAnimated></Progress>
                {step === 1 ?
                    <Form1 setStep={(value) => setStep(value)} setCourseId={setCourseId} courseToEdit={courseToEdit}/> :
                    <Form2 courseId={courseId} setProgress={setProgress}/>}
                <ButtonGroup mt='5%' w='100%'>
                </ButtonGroup>
            </Box>
        </>
    )
        ;
}