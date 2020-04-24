import React, {useState} from 'react'
import {useHistory} from 'react-router-dom'

import TableContainer from '@material-ui/core/TableContainer'
import Table from '@material-ui/core/Table'
import TableHead from '@material-ui/core/TableHead'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'
import TableSortLabel from '@material-ui/core/TableSortLabel'

function createData({UID_VEHICULO,
                      UID_PHYSICAL,
                      UID_EXTERNAL,
                      ESTATUS_VEHICULO,
                      CIUDAD,
                      NOMBRE_OPERADOR,
                      ESTATUS_CONEXION,
                      FABRICANTE,
                      MODELO}) {
  return {
    UID_VEHICULO,
    UID_PHYSICAL,
    UID_EXTERNAL,
    ESTATUS_VEHICULO,
    CIUDAD,
    NOMBRE_OPERADOR,
    ESTATUS_CONEXION,
    FABRICANTE,
    MODELO,
  }
}

const headCells = [
  {id: 'UID_VEHICULO', disablePadding: true, label: 'UID_VEHICULO'},
  {id: 'UID_PHYSICAL', disablePadding: true, label: 'UID_PHYSICAL'},
  {id: 'UID_EXTERNAL', disablePadding: true, label: 'UID_EXTERNAL'},
  {id: 'ESTATUS_VEHICULO', disablePadding: true, label: 'ESTATUS'},
  {id: 'CIUDAD', disablePadding: false, label: 'CIUDAD'},
  {id: 'NOMBRE_OPERADOR', disablePadding: false, label: 'OPERADOR'},
  {id: 'ESTATUS_CONEXION', disablePadding: false, label: 'CONEXION'},
  {id: 'FABRICANTE', disablePadding: false, label: 'FABRICANTE'},
  {id: 'MODELO', disablePadding: false, label: 'MODELO'},
]

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

function SortTableHead(props) {
  const {order, orderBy, onRequestSort} = props
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property)
  }
  return <TableHead>
    <TableRow>
      {headCells.map((headCell, idx) => (
          <TableCell
            key={headCell.id}
            align="center"
            sortDirection={orderBy === headCell.id ? order : false}
            className={headCell.disablePadding ? 'text-center' : 'text-center px-3'}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span style={{
                  border: 0,
                  clip: 'rect(0 0 0 0)',
                  height: 1,
                  margin: -1,
                  overflow: 'hidden',
                  padding: 0,
                  position: 'absolute',
                  top: 20,
                  width: 1,
                }}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ),
      )}
    </TableRow>
  </TableHead>
}

const CarTable = ({cars}) => {
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('UID_VEHICULO');
  const history = useHistory()
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc'
    setOrder(isAsc ? 'desc' : 'asc')
    setOrderBy(property)
  }
  const rows = cars.map(car => createData(car))
  
  function handleClick(UID) {
    history.push(`/${UID}`)
  }
  
  return <TableContainer>
    <Table className="table mb-5 mt-2 table-sm table-striped table-hover">
      <SortTableHead
        order={order}
        orderBy={orderBy}
        onRequestSort={handleRequestSort}
      />
      <TableBody>
        {stableSort(rows, getComparator(order, orderBy))
          .map((row, idx) => (
            <TableRow
              hover
              tabIndex={-1}
              key={idx}
              onClick={() => handleClick(row.UID_PHYSICAL)}
              style={{cursor:'pointer'}}
            >
              <TableCell className="text-center">{row.UID_VEHICULO}</TableCell>
              <TableCell className="text-center">{row.UID_PHYSICAL}</TableCell>
              <TableCell className="text-center">{row.UID_EXTERNAL}</TableCell>
              <TableCell className="text-center">{row.ESTATUS_VEHICULO}</TableCell>
              <TableCell className="text-center">{row.CIUDAD}</TableCell>
              <TableCell className="text-center">{row.NOMBRE_OPERADOR}</TableCell>
              <TableCell className="text-center">{row.ESTATUS_CONEXION}</TableCell>
              <TableCell className="text-center">{row.FABRICANTE}</TableCell>
              <TableCell className="text-center">{row.MODELO}</TableCell>
            </TableRow>
          ))
        }
      </TableBody>
    </Table>
  </TableContainer>
}

export default CarTable
