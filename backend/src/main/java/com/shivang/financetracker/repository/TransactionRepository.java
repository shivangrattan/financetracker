package com.shivang.financetracker.repository;

import com.shivang.financetracker.entity.Transaction;
import com.shivang.financetracker.entity.TransactionType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface TransactionRepository extends JpaRepository<Transaction, Long> {
    List<Transaction> findByType(TransactionType type);
    
    List<Transaction> findByCategory(String category);
    
    List<Transaction> findByDateBetween(LocalDate startDate, LocalDate endDate);
    
    @Query("SELECT DISTINCT t.category FROM Transaction t")
    List<String> findAllCategories();
}
