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
import { useState, useCallback } from 'react';
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
  {user_id: 1, group: "control", value: 8, metric: "Deals clicks"},
  {user_id: 1, group: "control", value: 1, metric: "Deals clicks"},
  {user_id: 1, group: "control", value: 2, metric: "Deals clicks"},
  {user_id: 1, group: "control", value: 5, metric: "Deals clicks"},
  {user_id: 1, group: "treatment", value: 6, metric: "Deals clicks"},
  {user_id: 1, group: "treatment", value: 23, metric: "Deals clicks"},
  {user_id: 1, group: "treatment", value: 12, metric: "Deals clicks"},
  {user_id: 1, group: "treatment", value: 14, metric: "Deals clicks"},
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

  const [showStatSig, setShowStatSig] = useState(true);
  const [showNoStatSig, setShowNoStatSig] = useState(true);

  const [showNavMetric, setShowNavMetric] = useState(false);
  const [showBannerMetric, setBannerMetric] = useState(false);
  const [showDealsMetric, setShowDealsMetric] = useState(false);
  const [showPageViewsMetric, setShowPageViewsMetric] = useState(false);
  const [showRevenueMetric, setShowRevenueMetric] = useState(false);

  const [showBannerTable, setShowBannerTable] = useState(false);
  const [showDealsTable, setShowDealsTable] = useState(false);

  const handleChange = ev => {
    setFilter(ev.target.value);
    console.log(filter);
  };
  const handleClickMetric = event => {
    setAnchorEl(event.currentTarget);
    if(event.currentTarget.id == "banner-metric") {
      setShowBannerTable(true);
      setShowDealsTable(false);
    }
    if(event.currentTarget.id == "deals-metric") {
      setShowBannerTable(false);
      setShowDealsTable(true);
    }
    console.log(event.target);
  };

  const handleClickOnPreview = event => {
    setShowChart(!showChart)
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleFilter = (event) => {
    const { value } = event.target;
    if(value === "stat-sig") {
      setShowStatSig(true);
      setShowNoStatSig(false);
    } else if(value === "no-stat-sig") {
      setShowStatSig(false);
      setShowNoStatSig(true);
    } else {
      setShowStatSig(true);
      setShowNoStatSig(true);
    }
  };

  const showMetric = (event) => {
    // event.preventDefault();
    const { value } = event.target;
    if("Deals" === value) {
      setShowDealsMetric(!showDealsMetric)
    }
    if("Banner" === value) {
      setBannerMetric(!showBannerMetric)
    }
    if("Navegation" === value) {
      setShowNavMetric(!showNavMetric)
    }
    if("PageViews" === value) {
      setShowPageViewsMetric(!showPageViewsMetric)
    }
    if("Revenue" === value) {
      setShowRevenueMetric(!showRevenueMetric)
    }
  };

  const rowsBanner = [
    createData('Clicks en banner', 9, 7, 22.2),
  ];

  const rowsDeals = [
    createData('Clicks en deals', 8, 9, -11.11),
  ];

  const rows = () => {
    if(showBannerTable) {
      return rowsBanner;
    }
    return rowsDeals;
  }

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
              <div className={ showNavMetric ? 'nav-metric active' : 'nav-metric' } id="nav-metric" onClick={handleClickMetric}></div>
              <div className={ showBannerMetric ? 'banner-metric active' : 'banner-metric'} id="banner-metric" onClick={handleClickMetric} ></div>
              <div className={ showDealsMetric ? 'deals-metric active-neg' : 'deals-metric'} id="deals-metric" onClick={handleClickMetric}></div>
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
                      <TableCell align="right">Box plot</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rows().map((row) => (
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
                <VictoryChart domainPadding={40}>
                  <VictoryBoxPlot
                    boxWidth={40}
                    categories={{ x: ["Experimental", "Control"] }}
                    data={
                      showBannerTable ? [
                      { x: 1, y: [9,9,9,9.1,9.9,9.1,9.9,9.1,8.6,9.9] },
                      { x: 2, y: [7,7.2,7.5,7,7,6,8.5] }
                    ]
                    : [
                      { x: 1, y: [8,8,8,8.1,8.9,8.1,8.9,8.1,8.6,7.9] },
                      { x: 2, y: [9,9.2,9.5,9,9,9.6,9.5] }
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
                    <FormControlLabel control={<Radio value="todas" onChange={(event) => handleFilter(event)}/>} label="Todas las métricas" />
                    <FormControlLabel control={<Radio value="stat-sig" onChange={(event) => handleFilter(event)}/>} label="Estadísticamente significativo" />
                    <FormControlLabel control={<Radio value="no-stat-sig" onChange={(event) => handleFilter(event)}/>} label="No es estadísticamente significativo" />
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
                  <FormGroup >
                    { showStatSig ? <FormControlLabel control={<Checkbox onChange={(event) => showMetric(event)} value={"Navegation"}/>} label="Clicks en navegación" /> : <></>}
                    { showStatSig ? <FormControlLabel control={<Checkbox onChange={(event) => showMetric(event)} value={"Banner"}/>} label="Clicks en banner" /> : <></>}
                    { showStatSig ? <FormControlLabel control={<Checkbox onChange={(event) => showMetric(event)} value={"Deals"}/>} label="Clicks en deals" /> : <></>}
                    { showStatSig ? <FormControlLabel control={<Checkbox onChange={(event) => showMetric(event)} value={"PageViews"}/>} label="Vistas" /> : <></>}
                    { showStatSig ? <FormControlLabel control={<Checkbox onChange={(event) => showMetric(event)} value={"Revenue"}/>} label="Revenue" /> : <></>}
                    { showNoStatSig ? <FormControlLabel control={<Checkbox onChange={(event) => showMetric(event)} value={"Navegation"}/>} label="Errores" /> : <></>}
                    { showNoStatSig ? <FormControlLabel control={<Checkbox onChange={(event) => showMetric(event)} value={"Banner"}/>} label="Retención de usuarios" /> : <></>}
                    { showNoStatSig ? <FormControlLabel control={<Checkbox onChange={(event) => showMetric(event)} value={"Deals"}/>} label="Clicks en footer" /> : <></>}
                    { showNoStatSig ? <FormControlLabel control={<Checkbox onChange={(event) => showMetric(event)} value={"PageViews"}/>} label="Usuarios activos diarios" /> : <></>}
                    { showNoStatSig ? <FormControlLabel control={<Checkbox onChange={(event) => showMetric(event)} value={"Revenue"}/>} label="Usuarios activos semanales" /> : <></>}
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
