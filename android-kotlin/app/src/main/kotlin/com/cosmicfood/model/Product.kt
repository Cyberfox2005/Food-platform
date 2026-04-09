package com.cosmicfood.model

data class Product(
    val id: Int,
    val name: String,
    val description: String,
    val price: Double,
    val category: String,
    val image: String,
    val dietary: List<String>,
    val rating: Double,
    val reviewsCount: Int
)
