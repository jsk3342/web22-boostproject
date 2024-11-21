import { Controller, useFormContext } from 'react-hook-form';
import { FormValues } from './types';
import { FormCell, Input, Label } from './style';

export default function CategoryField() {
  const { control } = useFormContext<FormValues>();

  return (
    <FormCell>
      <Label>카테고리</Label>
      <Controller
        name="category"
        control={control}
        render={({ field }) => <Input {...field} type="text" placeholder="카테고리 검색" />}
      />
    </FormCell>
  );
}
