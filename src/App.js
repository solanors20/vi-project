import './App.css';
import { VictoryBoxPlot, VictoryChart } from 'victory';
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
import { useState } from 'react';
import Popover from '@mui/material/Popover';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';
import ArrowCircleDownIcon from '@mui/icons-material/ArrowCircleDown';
import { pink } from '@mui/material/colors';
import PreviewIcon from '@mui/icons-material/Preview';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

function createData(name, treatmentValue, controlValue, percentageDifference) {
  return { name, treatmentValue, controlValue, percentageDifference };
}

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
  const [filter, setFilter] = useState("todas");
  const [anchorEl, setAnchorEl] = useState(null);
  const [showChart, setShowChart] = useState(false);

  const handleChange = ev => {
    setFilter(ev.target.value);
    console.log(filter);
  };
  const handleClickMetric = event => {
    setAnchorEl(event.currentTarget);
    console.log(event.target);
  };

  const handleClickOnPreview = event => {
    setShowChart(!showChart)
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const rows = [
    createData('Banner - Clicks totales', 200, 150, 25),
    createData('Banner - Click por usuario', 1.5, 0.8, 37),
    createData('Banner - Ganancia', 1000, 990, -0.1),
  ];

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;
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
          <Item>
            <div className='app-background'>
              <div className='nav-metric'></div>
              <div className='banner-metric' onClick={handleClickMetric}></div>
              <div className='deals-metric'></div>
            </div>
            <Popover
              id={id}
              open={open}
              anchorEl={anchorEl}
              onClose={handleClose}
              anchorOrigin={{
                vertical: 'center',
                horizontal: 'center',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'center',
              }}
            >
              {showChart ? 
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell></TableCell>
                      <TableCell>Métrica</TableCell>
                      <TableCell align="right">Grupo experimental</TableCell>
                      <TableCell align="right">Grupo de control</TableCell>
                      <TableCell align="right">Delta</TableCell>
                      <TableCell align="right">Gráfico de bigotes</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rows.map((row) => (
                      <TableRow
                        key={row.name}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                      >
                        <TableCell align="right">
                          {row.percentageDifference > 0 ? <ArrowCircleUpIcon color="success"/> : <ArrowCircleDownIcon sx={{ color: pink[500] }}/>}
                        </TableCell>
                        <TableCell component="th" scope="row">
                          {row.name}
                        </TableCell>
                        <TableCell align="right">{row.treatmentValue}</TableCell>
                        <TableCell align="right">{row.controlValue}</TableCell>
                        <TableCell align="right">{row.percentageDifference}%</TableCell>
                        <TableCell align="right">
                        <IconButton id={row.name} aria-label="Ver grafico" onClick={handleClickOnPreview}>
                          <PreviewIcon />
                        </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              :
              <div>
                <IconButton onClick={handleClickOnPreview}>
                  <ArrowBackIcon />
                </IconButton>
                <VictoryChart domainPadding={20}>
                  <VictoryBoxPlot
                    boxWidth={20}
                    data={[
                      { x: 1, y: [1, 2, 3, 5] },
                      { x: 2, y: [3, 2, 8, 10] }
                    ]}
                  />
                </VictoryChart>
              </div>
              }
            </Popover>
          </Item>
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
                      defaultValue="todas"
                      name="radio-buttons-group"
                      onChange={handleChange} value={filter}
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
    </Box>
    </div>
    </LocalizationProvider>
  );
}

export default App;
