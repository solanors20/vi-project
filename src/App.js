import './App.css';
import { VictoryBar, VictoryChart } from 'victory';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import Checkbox from '@mui/material/Checkbox';
import BarChartIcon from '@mui/icons-material/BarChart';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Divider from '@mui/material/Divider';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

const data = [
  {quarter: 1, earnings: 13000},
  {quarter: 2, earnings: 16500},
  {quarter: 3, earnings: 14250},
  {quarter: 4, earnings: 19000}
];

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div className="App">
    <Box
      sx={{
        width: "100%",
        height: "100%",
      }}
    >
      <AppBar position="static" className='app-bar'>
        <Toolbar variant="dense">
          <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
            <BarChartIcon />
          </IconButton>
          <DatePicker label="Fecha de inicio" className='experiment-date'/>
          <DatePicker label="Fecha fin" className='experiment-date'/>
        </Toolbar>
      </AppBar>
      <Divider />
      <Grid container spacing={2}>
        <Grid item xs={6} md={8} >
          <Item><div className='app-background'>test</div></Item>
        </Grid>
        <Grid item xs={6} md={4}>
          <Item>
            <div className='right-panel'>
              <Accordion expanded={true}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography>Filtros</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <RadioGroup
                      aria-labelledby="demo-radio-buttons-group-label"
                      defaultValue="female"
                      name="radio-buttons-group"
                    >
                    <FormControlLabel value="todas" control={<Radio />} label="Todas las métricas" />
                    <FormControlLabel value="stat-sig" control={<Radio />} label="Estadísticamente significativo" />
                    <FormControlLabel value="no-stat-sig" control={<Radio />} label="No es estadísticamente significativo" />
                  </RadioGroup>
                </AccordionDetails>
              </Accordion>
              <Accordion expanded={true}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel2a-content"
                  id="panel2a-header"
                >
                  <Typography>Métricas</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <FormGroup>
                    <FormControlLabel control={<Checkbox defaultChecked />} label="Clicks por usuario" />
                    <FormControlLabel control={<Checkbox defaultChecked />} label="Retención de usuarios" />
                    <FormControlLabel control={<Checkbox defaultChecked />} label="Ganancia" />
                  </FormGroup>
                </AccordionDetails>
              </Accordion>
            </div>
          </Item>
        </Grid>
      </Grid>
      <VictoryChart>
        <VictoryBar
          data={data}
          x="quarter"
          y="earnings"
        />
      </VictoryChart>
    </Box>
    </div>
    </LocalizationProvider>
  );
}

export default App;
