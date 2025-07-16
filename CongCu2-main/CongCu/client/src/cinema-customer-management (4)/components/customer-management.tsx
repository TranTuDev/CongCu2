"use client"

import { useState } from "react"
import { Header } from "./header"
import { Sidebar } from "./sidebar"
import { CustomerTable } from "./customer-table"
import { CustomerDialog } from "./customer-dialog"
import { CustomerStats } from "./customer-stats"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

export interface Customer {
  id: string
  name: string
  email: string
  phone: string
  dateOfBirth: string
  gender: "male" | "female" | "other"
  membershipLevel: "bronze" | "silver" | "gold" | "platinum"
  totalSpent: number
  totalBookings: number
  status: "active" | "inactive" | "suspended"
  joinDate: string
  lastActivity: string
}

const mockCustomers: Customer[] = [
  {
    id: "1",
    name: "Nguyễn Văn An",
    email: "nguyenvanan@email.com",
    phone: "0901234567",
    dateOfBirth: "1990-05-15",
    gender: "male",
    membershipLevel: "gold",
    totalSpent: 2500000,
    totalBookings: 25,
    status: "active",
    joinDate: "2023-01-15",
    lastActivity: "2024-01-07",
  },
  {
    id: "2",
    name: "Trần Thị Bình",
    email: "tranthibinh@email.com",
    phone: "0912345678",
    dateOfBirth: "1985-08-22",
    gender: "female",
    membershipLevel: "platinum",
    totalSpent: 5200000,
    totalBookings: 48,
    status: "active",
    joinDate: "2022-11-08",
    lastActivity: "2024-01-08",
  },
  {
    id: "3",
    name: "Lê Minh Cường",
    email: "leminhcuong@email.com",
    phone: "0923456789",
    dateOfBirth: "1995-03-10",
    gender: "male",
    membershipLevel: "silver",
    totalSpent: 1200000,
    totalBookings: 12,
    status: "inactive",
    joinDate: "2023-06-20",
    lastActivity: "2023-12-15",
  },
  {
    id: "4",
    name: "Phạm Thị Dung",
    email: "phamthidung@email.com",
    phone: "0934567890",
    dateOfBirth: "1992-12-05",
    gender: "female",
    membershipLevel: "bronze",
    totalSpent: 800000,
    totalBookings: 8,
    status: "active",
    joinDate: "2023-09-12",
    lastActivity: "2024-01-06",
  },
  {
    id: "5",
    name: "Hoàng Văn Em",
    email: "hoangvanem@email.com",
    phone: "0945678901",
    dateOfBirth: "1988-07-18",
    gender: "male",
    membershipLevel: "gold",
    totalSpent: 3100000,
    totalBookings: 31,
    status: "suspended",
    joinDate: "2022-08-03",
    lastActivity: "2023-11-20",
  },
]

export function CustomerManagement() {
  const [customers, setCustomers] = useState<Customer[]>(mockCustomers)
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [membershipFilter, setMembershipFilter] = useState<string>("all")

  const [confirmDialog, setConfirmDialog] = useState<{
    isOpen: boolean
    customer: Customer | null
    action: "lock" | "unlock"
  }>({
    isOpen: false,
    customer: null,
    action: "lock",
  })

  const handleToggleCustomerStatus = (customer: Customer) => {
    const action = customer.status === "suspended" ? "unlock" : "lock"
    setConfirmDialog({
      isOpen: true,
      customer,
      action,
    })
  }

  const handleConfirmAction = () => {
    if (confirmDialog.customer) {
      const newStatus = confirmDialog.action === "unlock" ? "active" : "suspended"
      setCustomers(
        customers.map((c) =>
          c.id === confirmDialog.customer!.id
            ? { ...c, status: newStatus, lastActivity: new Date().toISOString().split("T")[0] }
            : c,
        ),
      )
    }
    setConfirmDialog({ isOpen: false, customer: null, action: "lock" })
  }

  const handleCancelAction = () => {
    setConfirmDialog({ isOpen: false, customer: null, action: "lock" })
  }

  const handleEditCustomer = handleToggleCustomerStatus

  const handleSaveCustomer = (customerData: Omit<Customer, "id">) => {
    if (selectedCustomer) {
      // Edit existing customer
      setCustomers(
        customers.map((c) => (c.id === selectedCustomer.id ? { ...customerData, id: selectedCustomer.id } : c)),
      )
    } else {
      // Add new customer
      const newCustomer: Customer = {
        ...customerData,
        id: Date.now().toString(),
      }
      setCustomers([...customers, newCustomer])
    }
    setIsDialogOpen(false)
  }

  const filteredCustomers = customers.filter((customer) => {
    const matchesSearch =
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.phone.includes(searchTerm)

    const matchesStatus = statusFilter === "all" || customer.status === statusFilter
    const matchesMembership = membershipFilter === "all" || customer.membershipLevel === membershipFilter

    return matchesSearch && matchesStatus && matchesMembership
  })

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-6">
          <div className="max-w-7xl mx-auto space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Quản lý khách hàng</h1>
                <p className="text-gray-600 mt-1">Quản lý thông tin và tài khoản khách hàng</p>
              </div>
            </div>

            <CustomerStats customers={customers} />

            <CustomerTable
              customers={filteredCustomers}
              onEdit={handleEditCustomer}
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              statusFilter={statusFilter}
              onStatusFilterChange={setStatusFilter}
              membershipFilter={membershipFilter}
              onMembershipFilterChange={setMembershipFilter}
            />

            <CustomerDialog
              customer={selectedCustomer}
              isOpen={isDialogOpen}
              onClose={() => setIsDialogOpen(false)}
              onSave={handleSaveCustomer}
            />
          </div>
        </main>
      </div>
      <AlertDialog open={confirmDialog.isOpen} onOpenChange={(open) => !open && handleCancelAction()}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {confirmDialog.action === "lock" ? "Khóa tài khoản" : "Mở khóa tài khoản"}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {confirmDialog.action === "lock"
                ? `Bạn có chắc chắn muốn khóa tài khoản của "${confirmDialog.customer?.name}"? Khách hàng sẽ không thể sử dụng dịch vụ khi tài khoản bị khóa.`
                : `Bạn có chắc chắn muốn mở khóa tài khoản của "${confirmDialog.customer?.name}"? Khách hàng sẽ có thể sử dụng lại dịch vụ.`}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={handleCancelAction}>Hủy</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirmAction}
              className={
                confirmDialog.action === "lock" ? "bg-red-600 hover:bg-red-700" : "bg-green-600 hover:bg-green-700"
              }
            >
              {confirmDialog.action === "lock" ? "Khóa tài khoản" : "Mở khóa"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
