import { ContractAnalysis } from "@/interfaces/contract.interface"
import { api } from "@/lib/api";
import { useQuery } from "@tanstack/react-query"
import { useState } from "react";
import { ColumnDef, flexRender, getCoreRowModel, getPaginationRowModel, getSortedRowModel, SortingState, useReactTable } from "@tanstack/react-table";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { MoreHorizontal, Table as TableIcon } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { UploadModal } from "../modals/upload-modal";
import { cn } from "@/lib/utils";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "../ui/dropdown-menu";
import Link from "next/link";
import { 
  AlertDialog, 
  AlertDialogAction, 
  AlertDialogCancel, 
  AlertDialogContent, 
  AlertDialogDescription, 
  AlertDialogFooter, 
  AlertDialogHeader, 
  AlertDialogTitle, 
  AlertDialogTrigger 
} from "../ui/alert-dialog";

export default function UserContracts() {
    const { data: contracts, refetch } = useQuery<ContractAnalysis[]>({
        queryKey: ["user-contracts"],
        queryFn: () => fetchUserContracts(),
    });

    const [sorting, setSorting] = useState<SortingState>([]);
    const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
    const [contractToDelete, setContractToDelete] = useState<string | null>(null);

    const contractTypeColors: { [key: string]: string } = {
        "Employment": "bg-blue-100 text-blue-800 hover:bg-blue-200",
        "Non-Disclosure Agreement": "bg-green-100 text-green-800 hover:bg-green-200",
        "Sales": "bg-yellow-100 text-yellow-800 hover:bg-yellow-200",
        "Lease": "bg-emerald-100 text-emerald-800 hover:bg-emerald-200",
        "Service": "bg-pink-100 text-pink-800 hover:bg-pink-200",
        "Other": "bg-gray-100 text-gray-800 hover:bg-gray-200",
    };
      
    const columns: ColumnDef<ContractAnalysis>[] = [
        {
            accessorKey: "_id",
            header: ({ column }) => {
                return <Button variant="ghost">Contract Id</Button>
            },
            cell: ({ row }) => {
                return (
                    <div className="font-medium">
                        {row.getValue("_id")}
                    </div>
                )
            }
        },
        {
            accessorKey: "overallScore",
            header: () => <div className="font-medium">Overall Score</div>,
            cell: ({ row }) => {
                const score = parseFloat(String(row.getValue("overallScore")));
                let badgeClass = "";
                
                if (score >= 80) {
                    badgeClass = "bg-green-100 text-green-800 border-green-200";
                } else if (score >= 70) {
                    badgeClass = "bg-blue-100 text-blue-800 border-blue-200";
                } else if (score >= 60) {
                    badgeClass = "bg-yellow-100 text-yellow-800 border-yellow-200";
                } else if (score >= 50) {
                    badgeClass = "bg-orange-100 text-orange-800 border-orange-200";
                } else {
                    badgeClass = "bg-red-100 text-red-800 border-red-200";
                }
                
                return (
                    <Badge className={cn("rounded-md font-medium", badgeClass)}>
                        {score.toFixed(2)}
                    </Badge>
                );
            }
        },
        {
            accessorKey: "contractType",
            header: "Contract Type",
            cell: ({ row }) => {
               const contractType = row.getValue("contractType") as string;
               const colorClass =
               contractTypeColors[contractType] || contractTypeColors["Other"];
                return <Badge className={cn("rounded-md", colorClass)}>{contractType}</Badge>
            }
        },
      {
        id: "actions",
        cell: ({ row }) => {
        const contract = row.original;

        const handleDeleteClick = async () => {
          try {
            await api.delete(`/contracts/${contract._id}`);
            refetch(); // Refresh the data after deletion
          } catch (error) {
            console.error("Error deleting contract:", error);
          }
        };

        return (
          <AlertDialog>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="size-8 p-0">
                  <span className="sr-only">Open Menu</span>
                  <MoreHorizontal className="size-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <Link href={`/dashboard/contract/${contract._id}`} className="w-full">
                  <DropdownMenuItem className="cursor-pointer">
                    View Details
                  </DropdownMenuItem>
                </Link>
                <DropdownMenuSeparator />
                <AlertDialogTrigger asChild>
                  <DropdownMenuItem 
                    className="cursor-pointer hover:text-destructive/20 text-destructive"
                    onSelect={(e) => e.preventDefault()}>
                    Delete Contract
                  </DropdownMenuItem>
                </AlertDialogTrigger>
              </DropdownMenuContent>
            </DropdownMenu>
            
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete your contract
                  and remove your data from our servers.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction 
                  onClick={(e) => {
                    e.preventDefault();
                    handleDeleteClick();
                  }}
                >
                  Continue
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        );
        },
      },
    ];

    const table = useReactTable({
        data: contracts ?? [],
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),
        state: {
            sorting,
        },
    });

    const totalContracts = contracts?.length || 0;

    const averageScore = totalContracts > 0
    ? (contracts?.reduce (
        (sum, contract) => sum + (typeof contract.overallScore === "number" ? contract.overallScore : parseFloat(contract.overallScore ?? "0")),
        0
    ) ?? 0) / totalContracts
    : 0;

    const highRiskContracts = 
    contracts?.filter((contract) => 
        contract.risks.some((risk) => risk.severity === "high")
    ).length ?? 0;

    return ( 
    <div className="container mx-auto p-6 space-y-8">
        <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">
        Your Contracts
        </h1>
        <Button onClick={ () => setIsUploadModalOpen(true)}>
            New Contract
        </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                    Total Contracts
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">
                       {totalContracts}
                    </div>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                        Average Score
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">
                       {averageScore.toFixed(2)}
                    </div>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                        High Risk Contracts
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">
                       {highRiskContracts}
                    </div>
                </CardContent>
            </Card>
        </div>

            <div className="rounded-md border">
            <Table>
            <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
            <TableHead key={header.id}>
            {header.isPlaceholder
            ? null
            : flexRender(
                header.column.columnDef.header,
                header.getContext()
                )}
            </TableHead>
            ))}
            </TableRow>
            ))}
            </TableHeader>
            <TableBody>
                {table.getRowModel().rows?.length ? (
                    table.getRowModel().rows.map((row) => (
                        <TableRow
                        key={row.id}
                        data-state={row.getIsSelected() && "selected"}
                      >
                        {row.getVisibleCells().map((cell) => (
                          <TableCell key={cell.id}>
                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                          </TableCell>
                        ))}
                      </TableRow>                      
                    ))
                ): (
                    <TableRow>
                        <TableCell
                        colSpan={columns.length}
                        className="h-24 text-center"
                        >
                        No Results.    
                        </TableCell>
                        </TableRow>
                )}
            </TableBody>
            </Table>
        </div>
        <div className="flex items-center justify-end space-x-2 py-4">
            <Button
             variant="outline"
             size="sm"
             onClick={() => table.previousPage()}
             disabled={!table.getCanPreviousPage()}
             >
                Previous
             </Button>
             <Button
             variant="outline"
             size="sm"
             onClick={() => table.nextPage()}
             disabled={!table.getCanNextPage()}
             >
                Next
             </Button>
        </div>
        <UploadModal
        isOpen={isUploadModalOpen}
        onClose={ () => setIsUploadModalOpen(false)}
        onUploadComplete={() => {
          refetch();
          setIsUploadModalOpen(false);
        }}
        />
        </div>
    );
}

async function fetchUserContracts() : Promise<ContractAnalysis[]> {
    const response = await api.get("/contracts/user-contracts");
    return response.data;
}