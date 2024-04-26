import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

export default function BasicButtons() {
    const [num, setNum] = useState(0);


  return (
    <Stack spacing={2} direction="row">
        <div>{num}</div>
      <Button variant="text">Increase</Button>
      <Button variant="contained">decrease</Button>
    </Stack>
  );
}
