// import { useNavigate } from 'react-router-dom';
// import logo1 from '../images/it.png';
// import logo2 from '../images/hr.png';
// import logo3 from '../images/telecommunications.png';
// import logo4 from '../images/briefcase.png';



// function Jobcategories() {
//   const categories = [
//     { name: "IT & Software", logo: logo1 },
//     { name: "Technology", logo: logo2 },
//     { name: "Government", logo: logo3 },
//     { name: "Accounting& Finance", logo: logo4 },
//     { name: "Construction& Facilities", logo: logo4 },
//     { name: "Tele-communications", logo: logo3 },
//     { name: "Design & Multimedia", logo: logo2 },
//     { name: "Human Resource", logo: logo1 }
//   ];

//   const navigate = useNavigate();

//   const handleClick = (categoryName) => {
//     navigate(`/Categoriesposts/${categoryName}`);
//   };

//   return (
//     <div className="row justify-content-center">

//       <div className="col-lg-8">
//         <h1>Browse Job Categories</h1>
//         <p>Post a job to tell us about your project. We'll quickly match you with the right freelancers.</p>
//         <div className="container mt-5">
//           <div className="row">
//             {categories.map((category, index) => (
//               <div key={index} className="col-md-3 mb-4">
//                 <div className="card" onClick={() => handleClick(category.name)}>
//                   <img src={category.logo} className="card-img-top logo-small" alt={category.name} />
//                   <div className="card-body">
//                     <h5 className="card-title" >{category.name}</h5>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Jobcategories;
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Box, Grid, Card, CardMedia, CardContent, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import logo1 from '../images/it.png';
import logo2 from '../images/hr.png';
import logo3 from '../images/telecommunications.png';
import logo4 from '../images/briefcase.png';

const categories = [
  { name: "IT & Software", logo: logo1 },
  { name: "Technology", logo: logo2 },
  { name: "Government", logo: logo3 },
  { name: "Accounting & Finance", logo: logo4 },
  { name: "Construction & Facilities", logo: logo4 },
  { name: "Tele-communications", logo: logo3 },
  { name: "Design & Multimedia", logo: logo2 },
  { name: "Human Resource", logo: logo1 }
];

const StyledCard = styled(Card)(({ theme }) => ({
  cursor: 'pointer',
  transition: 'transform 0.3s, box-shadow 0.3s',
  '&:hover': {
    transform: 'scale(1.05)',
    boxShadow: '0 6px 20px rgba(0,0,0,0.2)',
  },
}));

const Jobcategories = () => {
  const navigate = useNavigate();

  const handleClick = (categoryName) => {
    navigate(`/Categoriesposts/${categoryName}`);
  };

  return (
    <Container>
      <Box sx={{ textAlign: 'center', mt: 4 }}>
        <Typography variant="h4" gutterBottom>Browse Job Categories</Typography>
        <Typography variant="subtitle1">Post a job to tell us about your project. We'll quickly match you with the right freelancers.</Typography>
      </Box>
      <Grid container spacing={4} sx={{ mt: 4 }}>
        {categories.map((category, index) => (
          <Grid item key={index} xs={12} sm={6} md={3}>
            <StyledCard onClick={() => handleClick(category.name)}>
              <CardMedia
                component="img"
                image={category.logo}
                alt={category.name}
                sx={{ height: 140, objectFit: 'contain', padding: 2 }}
              />
              <CardContent>
                <Typography variant="h6" align="center">{category.name}</Typography>
              </CardContent>
            </StyledCard>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default Jobcategories;
