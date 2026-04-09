package com.cosmicfood.data

import com.cosmicfood.model.Product
import retrofit2.http.GET
import retrofit2.http.Path

interface FoodApiService {
    @GET("products")
    suspend fun getProducts(): List<Product>

    @GET("products/{id}")
    suspend fun getProductById(@Path("id") id: Int): Product
}
