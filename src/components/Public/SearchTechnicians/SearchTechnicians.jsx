import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import SingleSearchTechnician from "./SingleSearchTechnician";
import SearchForm from "./SearchForm";
import SearchBar from "../SearchBar/SearchBar";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";
import TablePagination from "@mui/material/TablePagination";
import Pagination from "@mui/material/Pagination";
const BgSearchTechnician = styled("div")`
  width: 100%;
  margin: 0;
  padding: 0;
  background-color: #f9f9f9;
`;

const MainContainer = styled(Container)`
  margin-top: 200px;
  @media only screen and (max-width: 900px) {
    padding: 32px 16px !important;
  }
  z-index: 1;
  margin-bottom: 150px;
`;

const GridContainer = styled("div")`
  margin-top: 50px;
  margin-bottom: 50px;
`;

const LoadingContainer = styled("div")`
  display: flex;
  min-height: 400px;
  align-items: center;
  justify-content: center;
`;

export default function SearchTechnicians() {
  let [searchParams, setSearchParams] = useSearchParams();
  const [technicians, setTechnicians] = useState([]);
  const [loading, setLoading] = useState(false);

  const _category = searchParams.get("category");
  const _codepostal = searchParams.get("codepostal");
  const _langue = searchParams.getAll("langue");
  const _ville = searchParams.get("ville");
  const _speciality = searchParams.get("speciality");

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const [rowsPerPage, setRowsPerPage] = React.useState(8);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const displayedTechnicians = technicians.slice(startIndex, endIndex);
  const [page, setPage] = React.useState(2);

  function totalPages() {
    return Math.ceil(technicians.length / rowsPerPage);
  }
  function handlePageChange(event, pageNumber) {
    setCurrentPage(pageNumber);
  }

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  useEffect(() => {
    const info = {
      category: _category || "",
      codepostal: _codepostal || null,
      langue: _langue || [],
      ville: _ville || null,
      speciality: _category || null,
    };

    if (_category) {
      SearchDocs(info);
    }

    if (!_category) {
      setSearchParams(info);
      SearchDocs(info);
    }
  }, []);

  const SearchDocs = (data) => {
    const info = {
      category: data.category || null,
      codePostal: Number(data.codepostal) || null,
      langue: [], //data.langue || [],
      ville: data.ville || null,
      speciality: data.category || null,
    };

    //  if (data.category) {
    setLoading(true);
    axios
      .post("http://192.168.1.113:5000/search/personnel/precise", info)
      .then((res) => {
        console.log("info = ",info);
        console.log("res = ", res);
        // const resData = res?.data[`${data.category}s`] || [];
        const plombiers = res?.data[`plombiers`] || [];
        const soudeurs = res?.data[`soudeurs`] || [];
        const electriciens = res?.data[`electriciens`] || [];
        const paysagistes = res?.data[`paysagistes`] || [];
        const peintres = res?.data[`peintres`] || [];
        const chauffagistes = res?.data[`chauffagistes`] || [];
        const carreleurs = res?.data[`carreleurs`] || [];
        const serruriers = res?.data[`serruriers`] || [];
        const menuisiers = res?.data[ `menuisiers`] || [];
        
        const techs=[];
        techs.push(...plombiers,...soudeurs,...electriciens, ...paysagistes,...peintres,...chauffagistes,...serruriers,...menuisiers);
        //if (resData) {
           setTechnicians(techs);
           setLoading(false);
        //  }
      })
      .catch((err) => {
        setTechnicians([]);
        setLoading(false);
        console.log(err.response.data, "zzzzzzzz");
      });
    // }
  };

  const handleSubmit = (data) => {
    SearchDocs({
      langue: data.data.langue,

      ville: data.data.ville,
      codepostal: data.data.codepostal,
      category: data.category,
    });

    setSearchParams({
      langue: data.data.langue,

      ville: data.data.ville,
      codepostal: data.data.codepostal,
      category: data.category,
    });
  };

  return (
    <BgSearchTechnician>
      <MainContainer maxWidth="lg" style={{ flexGrow: 1 }}>
        <SearchBar handleSubmit={handleSubmit} loading={loading} />
        {loading ? (
          <LoadingContainer>
            <CircularProgress />
          </LoadingContainer>
        ) : technicians.length > 0 ? (
          <GridContainer>
            <span
              style={{
                display: "flex",
                justifyContent: "center",
                margin: "30px",
                flexWrap: "wrap",
                fontSize: "30px",
              }}
            >
              {" "}
              <Pagination
                count={totalPages()}
                page={currentPage}
                onChange={handlePageChange}
                color="primary"
                shape="rounded"
                showFirstButton
                showLastButton
              />
              <TablePagination
                component="div"
                count={technicians.length}
                page={currentPage}
                onPageChange={handlePageChange}
                rowsPerPage={rowsPerPage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                rowsPerPageOptions={[
                  8,
                  20,
                  50,
                  100,
                  { label: "All", value: -1 },
                ]}
                color="primary"
                shape="rounded"
              />
            </span>
            <Grid
              container
              spacing={{ xs: 3, md: 4 }}
              columns={{ xs: 4, sm: 8, md: 12, lg: 12 }}
            >
              {displayedTechnicians.map((data, i) => {
                if (data.deleted || data.banned) {
                  return null;
                }
                return <SingleSearchTechnician data={data} key={i} />;
              })}
            </Grid>
            <span
              style={{
                display: "flex",
                justifyContent: "center",
                margin: "30px",
                flexWrap: "wrap",
                fontSize: "30px",
              }}
            >
              {" "}
              <Pagination
                count={totalPages()}
                page={currentPage}
                onChange={handlePageChange}
                color="primary"
                shape="rounded"
                showFirstButton
                showLastButton
              />
              <TablePagination
                component="div"
                count={technicians.length}
                page={currentPage}
                onPageChange={handlePageChange}
                rowsPerPage={rowsPerPage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                rowsPerPageOptions={[
                  8,
                  20,
                  50,
                  100,
                  { label: "All", value: -1 },
                ]}
                color="primary"
                shape="rounded"
              />
            </span>
          </GridContainer>
        ) : (
          <Alert style={{ marginTop: "100px" }} severity="warning">
            Aucun technicien trouvé
          </Alert>
        )}
      </MainContainer>
    </BgSearchTechnician>
  );
}
