import { CustomerRepository as CustomerDao } from "codbex-partners/gen/dao/Customers/CustomerRepository";
import { Controller, Get } from "sdk/http";

@Controller
class PartnerService {
    private readonly customerDao;

    constructor() {
        this.customerDao = new CustomerDao();
    }

    @Get("/partnerData/customers/:customerId")
    public async getCustomerById(customerId: number) {
        try {
            console.log("Finding customer with ID:", customerId);
            const customer = await this.customerDao.findById(customerId);
            console.log("Customer found:", customer);
            if (customer !== null) {
                return customer;
            } else {
                console.log("Customer not found");
                return { error: "Customer not found" };
            }
        } catch (error) {
            console.error("Error retrieving customer:", error);
            return { error: "Internal server error" };
        }
    }
}
