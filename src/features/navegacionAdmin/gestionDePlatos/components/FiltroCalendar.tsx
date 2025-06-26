import * as React from 'react';
import { Dayjs } from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

function FiltroCalendar() {
  const [value, setValue] = React.useState<Dayjs | null>(null);

  // DatePicker por defecto coloca el dia actual del usuario (el admin en este caso)
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker value={value} onChange={(newValue) => setValue(newValue)} />
    </LocalizationProvider>
  );
};

export default FiltroCalendar;

