package com.pobitra.autocare.dto;

public class DashboardResponseDTO {

    private long totalCustomers;
    private long totalVehicles;
    private long totalServiceRecords;

    private long pendingServices;
    private long inProgressServices;
    private long completedServices;

    private long totalInvoices;
    private double totalRevenue;

    private long totalFeedbacks;
    private double averageRating;

    private long totalContactMessages;

    public DashboardResponseDTO() {
    }

    public long getTotalCustomers() {
        return totalCustomers;
    }

    public void setTotalCustomers(long totalCustomers) {
        this.totalCustomers = totalCustomers;
    }

    public long getTotalVehicles() {
        return totalVehicles;
    }

    public void setTotalVehicles(long totalVehicles) {
        this.totalVehicles = totalVehicles;
    }

    public long getTotalServiceRecords() {
        return totalServiceRecords;
    }

    public void setTotalServiceRecords(long totalServiceRecords) {
        this.totalServiceRecords = totalServiceRecords;
    }

    public long getPendingServices() {
        return pendingServices;
    }

    public void setPendingServices(long pendingServices) {
        this.pendingServices = pendingServices;
    }

    public long getInProgressServices() {
        return inProgressServices;
    }

    public void setInProgressServices(long inProgressServices) {
        this.inProgressServices = inProgressServices;
    }

    public long getCompletedServices() {
        return completedServices;
    }

    public void setCompletedServices(long completedServices) {
        this.completedServices = completedServices;
    }

    public long getTotalInvoices() {
        return totalInvoices;
    }

    public void setTotalInvoices(long totalInvoices) {
        this.totalInvoices = totalInvoices;
    }

    public double getTotalRevenue() {
        return totalRevenue;
    }

    public void setTotalRevenue(double totalRevenue) {
        this.totalRevenue = totalRevenue;
    }

    public long getTotalFeedbacks() {
        return totalFeedbacks;
    }

    public void setTotalFeedbacks(long totalFeedbacks) {
        this.totalFeedbacks = totalFeedbacks;
    }

    public double getAverageRating() {
        return averageRating;
    }

    public void setAverageRating(double averageRating) {
        this.averageRating = averageRating;
    }

    public long getTotalContactMessages() {
        return totalContactMessages;
    }

    public void setTotalContactMessages(long totalContactMessages) {
        this.totalContactMessages = totalContactMessages;
    }
}