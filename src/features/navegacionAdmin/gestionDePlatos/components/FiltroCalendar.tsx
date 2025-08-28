import { useState } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import 'dayjs/locale/es';                                     
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

// Activa el locale español
dayjs.locale('es');

interface Props {
  value: Dayjs | null;
  setValue: (value: Dayjs | null) => void;
}


export default function FiltroCalendar({ value, setValue }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <div className="filtro-calendar-container">
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="es">
        <DatePicker
          open={open}
          onOpen={() => setOpen(true)}
          onClose={() => setOpen(false)}
          value={value === null ? dayjs() : value}
          onChange={(newVal) => setValue(newVal)}
          format="dddd DD/MM"
          minDate={dayjs()}
          maxDate={dayjs().endOf('week')}
          label="Dia de la semana"
          slotProps={{
            textField: {
              inputProps: {
                readOnly: true
              },
              onKeyDown: (e) => e.preventDefault(),
              onClick: () => setOpen(true),
            },
            popper: {
              sx: {
                '& .MuiPaper-root': {
                  borderRadius: '12px',
                  boxShadow: '0 10px 25px rgba(0, 0, 0, 0.15)',
                  border: '1px solid #e2e8f0',
                  marginTop: '8px',
                },
                '& .MuiPickersCalendarHeader-root': {
                  backgroundColor: '#2196f3',
                  color: 'white',
                  paddingTop: '12px',
                  paddingBottom: '12px',
                },
                '& .MuiPickersCalendarHeader-label': {
                  fontSize: '16px',
                  fontWeight: '600',
                  fontFamily: 'Inter, sans-serif',
                  textTransform: 'capitalize',
                },
                '& .MuiDayCalendar-weekDayLabel': {
                  fontSize: '12px',
                  fontWeight: '600',
                  color: '#64748b',
                  fontFamily: 'Inter, sans-serif',
                  textTransform: 'capitalize',
                },
                '& .MuiPickersDay-root': {
                  fontSize: '14px',
                  fontFamily: 'Inter, sans-serif',
                  transition: 'all 0.2s ease',
                  '&:hover': {
                    backgroundColor: '#e3f2fd',
                    transform: 'scale(1.05)',
                  },
                  '&.Mui-selected': {
                    backgroundColor: '#2196f3 !important',
                    color: 'white',
                    fontWeight: '600',
                  },
                  '&.Mui-disabled': {
                    color: '#cbd5e1',
                  },
                  '&.MuiPickersDay-today': {
                    border: '2px solid #2196f3',
                    backgroundColor: 'transparent',
                    color: '#2196f3',
                    fontWeight: '600',
                    '&.Mui-selected': {
                      backgroundColor: '#2196f3 !important',
                      color: 'white',
                    },
                  },
                },
              },
            },
          }}
        />
      </LocalizationProvider>
    </div>
  );
}