package com.cosmicfood.viewmodel

import androidx.compose.runtime.State
import androidx.compose.runtime.mutableStateOf
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.cosmicfood.data.FoodApiService
import com.cosmicfood.model.Product
import kotlinx.coroutines.launch
import retrofit2.Retrofit
import retrofit2.converter.gson.GsonConverterFactory

class MenuViewModel : ViewModel() {
    private val _products = mutableStateOf<List<Product>>(emptyList())
    val products: State<List<Product>> = _products

    private val _isLoading = mutableStateOf(false)
    val isLoading: State<Boolean> = _isLoading

    // Base URL should point to your Express server IP/domain
    private val retrofit = Retrofit.Builder()
        .baseUrl("http://10.0.2.2:5000/api/v1/") // 10.0.2.2 is localhost for Android Emulator
        .addConverterFactory(GsonConverterFactory.create())
        .build()

    private val apiService = retrofit.create(FoodApiService::class.java)

    init {
        fetchProducts()
    }

    private fun fetchProducts() {
        viewModelScope.launch {
            _isLoading.value = true
            try {
                _products.value = apiService.getProducts()
            } catch (e: Exception) {
                // Handle error
            } finally {
                _isLoading.value = false
            }
        }
    }
}
