import { AddShoppingCartOutlined } from "@mui/icons-material";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Rating,
  Typography,
} from "@mui/material";
import React from "react";
import "./ProductCard.css";

const ProductCard = ({ product, handleAddToCart }) => {
  
  return (
    <Card className="card">
      <CardMedia
        sx={{ height: 140 }}
        component="img"
        src={product.image}
        alt={product.name}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {product.name}
        </Typography>
        <Typography variant="h4">
          ${product.cost}
        </Typography>
        <Rating name="read-only" value={product.rating} readOnly />
      </CardContent>
      <CardActions>
        <Button 
        variant="contained"
        fullWidth 
        startIcon ={<AddShoppingCartOutlined/>}
        onClick = {handleAddToCart}
        >ADD TO CART</Button>
      </CardActions>
    </Card>
  );
};

export default ProductCard;
