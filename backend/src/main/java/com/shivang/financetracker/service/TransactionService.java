package com.shivang.financetracker.service;

import com.shivang.financetracker.entity.Transaction;
import com.shivang.financetracker.entity.TransactionType;
import com.shivang.financetracker.repository.TransactionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class TransactionService {
    
    @Autowired
    private TransactionRepository transactionRepository;
    
    public List<Transaction> getAllTransactions() {
        return transactionRepository.findAll();
    }
    
    public Optional<Transaction> getTransactionById(Long id) {
        return transactionRepository.findById(id);
    }
    
    public Transaction createTransaction(Transaction transaction) {
        return transactionRepository.save(transaction);
    }
    
    public Transaction updateTransaction(Long id, Transaction transactionDetails) {
        Optional<Transaction> existingTransaction = transactionRepository.findById(id);
        if (existingTransaction.isPresent()) {
            Transaction transaction = existingTransaction.get();
            transaction.setAmount(transactionDetails.getAmount());
            transaction.setType(transactionDetails.getType());
            transaction.setCategory(transactionDetails.getCategory());
            transaction.setDescription(transactionDetails.getDescription());
            transaction.setDate(transactionDetails.getDate());
            return transactionRepository.save(transaction);
        }
        throw new RuntimeException("Transaction not found with id: " + id);
    }
    
    public void deleteTransaction(Long id) {
        if (transactionRepository.existsById(id)) {
            transactionRepository.deleteById(id);
        } else {
            throw new RuntimeException("Transaction not found with id: " + id);
        }
    }
    
    public List<Transaction> getTransactionsByType(TransactionType type) {
        return transactionRepository.findByType(type);
    }
    
    public List<Transaction> getTransactionsByCategory(String category) {
        return transactionRepository.findByCategory(category);
    }
    
    public List<Transaction> getTransactionsByDateRange(LocalDate startDate, LocalDate endDate) {
        return transactionRepository.findByDateBetween(startDate, endDate);
    }
    
    public List<String> getAllCategories() {
        return transactionRepository.findAllCategories();
    }
}
