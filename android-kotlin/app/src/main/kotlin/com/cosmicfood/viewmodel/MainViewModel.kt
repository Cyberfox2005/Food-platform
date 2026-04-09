package com.cosmicfood.viewmodel

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.cosmicfood.data.FoodApiService
import com.cosmicfood.model.Product
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.launch
import retrofit2.Retrofit
import retrofit2.converter.gson.GsonConverterFactory

sealed class UIState {
    object Loading : UIState()
    data class Success(val products: List<Product>) : UIState()
    data class Error(val message: String) : UIState()
}

class MainViewModel : ViewModel() {
    private val _uiState = MutableStateFlow<UIState>(UIState.Loading)
    val uiState: StateFlow<UIState> = _uiState

    init {
        fetchProducts()
    }

    private fun fetchProducts() {
        viewModelScope.launch {
            try {
                val retrofit = Retrofit.Builder()
                    .baseUrl("http://10.0.2.2:5000/api/v1/") // Localhost for Android Emulator
                    .addConverterFactory(GsonConverterFactory.create())
                    .build()

                val service = retrofit.create(FoodApiService::class.java)
                val products = service.getProducts()
                _uiState.value = UIState.Success(products)
            } catch (e: Exception) {
                _uiState.value = UIState.Error(e.message ?: "Unknown error")
            }
        }
    }
}
