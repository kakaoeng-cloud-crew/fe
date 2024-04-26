
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { useState } from 'react';

export default function BasicButtons() {
    const [num, setNum] = useState(0);  //컴포넌트 안에서 관리하는 상태값 = state, useState로 관리 되는 것이 num , setNum : 상태(num)를 변경시키기 위한 함수 
  return (
    <Stack spacing={2} direction="row">
        <div>{num}</div>
      <Button  onClick={() => {
        setNum(num-1);
      }}>Decrease</Button>
      <Button onClick={() =>{
        setNum(num+1);
      }}>Increase</Button>
    
        
    </Stack>
  );
}

