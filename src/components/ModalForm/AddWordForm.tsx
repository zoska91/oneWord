import { FC } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';

import {
  Input,
  Stack,
  Select,
  FormControl,
  FormErrorMessage,
  FormLabel,
  ModalFooter,
} from '@chakra-ui/react';

import { IInputsAddWord } from './formTypes';
import Button from 'components/atoms/Button';

interface AddWordFormProps {
  onClose: () => void;
}

const themeInput = {
  bg: 'white',
  focusBorderColor: '#2e2757',
};

const AddWordForm: FC<AddWordFormProps> = ({ onClose }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IInputsAddWord>();

  const onSubmit: SubmitHandler<IInputsAddWord> = data => console.log(data);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      style={{ padding: '50px 50px 20px' }}
    >
      <Stack spacing={6}>
        <FormControl isInvalid={Boolean(errors.basicWord)}>
          <FormLabel>Basic word</FormLabel>
          <Input
            id=''
            placeholder='Basic word'
            {...themeInput}
            {...register('basicWord', { required: 'This is required' })}
          />
          <FormErrorMessage>
            {errors?.basicWord && errors.basicWord.message}
          </FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={Boolean(errors.transWord)}>
          <FormLabel>Translated word</FormLabel>
          <Input
            placeholder='Translated word'
            {...themeInput}
            {...register('transWord', { required: 'This is required' })}
          />
          <FormErrorMessage>
            {errors?.transWord && errors.transWord.message}
          </FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={Boolean(errors.lang)}>
          <FormLabel>Language</FormLabel>
          <Select
            placeholder='Select Language'
            {...themeInput}
            {...register('lang', { required: 'This is required' })}
          >
            <option value='1'>English</option>
            <option value='2'>Polish</option>
            <option value='3'>Japan</option>
          </Select>
          <FormErrorMessage>
            {errors?.lang && errors.lang.message}
          </FormErrorMessage>
        </FormControl>
      </Stack>

      <ModalFooter
        justifyContent='space-between'
        style={{ paddingTop: '80px' }}
      >
        <Button small onClick={onClose}>
          Close
        </Button>
        <Button dark small>
          zapisz
        </Button>
      </ModalFooter>
    </form>
  );
};

export default AddWordForm;
