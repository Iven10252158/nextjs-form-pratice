import { useForm, Controller } from 'react-hook-form'
import { useState } from "react";
import {Select, MenuItem, Input} from '@mui/material'
import '@/app/style/form.css'


const Form = () => {
    const { control, handleSubmit } = useForm({
        defaultValues: {
          content: '',
          status: '進行中',
        },
      })
    const data = ['進行中', '已結案']
    // input是否是編輯狀態
    const [isEdit, setIsEdit] = useState(false)
    const onSubmit = (data) => {
        // 結束編輯
        setIsEdit(false)
        console.log('data', data)
    }

    const handleChange = (field) => (event) => {
        const value = event.target.value;
        field.onChange(value);
        
        console.log(field, event);
    }

    return (
        <section>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Controller
                    name="content"
                    control={control}
                    render={({field}) => {
                        return isEdit ? (
                            <Input
                                className={'w-full'}
                                autoFocus
                                value={field.value}
                                onChange={handleChange(field)}
                            />
                    ) : (
                        <span
                            className={'pointer'}
                            onClick={() => setIsEdit(true)}
                        >
                            {field.value || "點擊編輯"}
                        </span>
                    )
                    }}>

                </Controller>

                <br />

                <Controller
                    name="status"
                    control={control}
                    render={({ field }) => {
                        return (
                            <Select
                                {...field}
                                size={'small'}
                                className={'w-full'}   
                                value={field.value}
                                displayEmpty
                                onChange={handleChange(field)}
                            >
                                <MenuItem disabled value="">
                                    <span>請選擇狀態</span>
                                </MenuItem>
                                {data.map((item) => {
                                    return <MenuItem value={item} key={item}>{item}</MenuItem>
                                })}
                            </Select>
                        )
                    }}
                >
                    
                </Controller>
                <button className={'mt-4'} type="submit">{'送出'}</button>
            </form>

        </section>
    )
}

export default Form