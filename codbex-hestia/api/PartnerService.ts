import { CustomerRepository as CustomerDao } from "codbex-partners/gen/dao/Customers/CustomerRepository";

import { Controller, Get, Param } from "sdk/http";

@Controller
class PartnerService {

    private readonly customerDao;

    constructor() {
        this.customerDao = new CustomerDao();
    }

    // @Get("/partnerData")
    // public partnerData() {
    //     const customers = this.customerDao.findAll();
    // }

    @Get("/partnerData/customers/:customerId") // Define route parameter :customerId
    public async getCustomerById(@Param("customerId") customerId: number) {
        try {
            console.log("Finding customer with ID:", customerId);
            const customer = await this.customerDao.findById(customerId); // Assuming findById method exists in CustomerDao
            console.log("Customer found:", customer);
            if (customer !== null) { // Check if customer is not null
                return customer; // Return the customer if found
            } else {
                console.log("Customer not found");
                return { error: "Customer not found" }; // Return an error message if customer is not found
            }
        } catch (error) {
            console.error("Error retrieving customer:", error);
            return { error: "Internal server error" }; // Return an error message if there's an internal server error
        }
    }
}