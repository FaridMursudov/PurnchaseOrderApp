using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace ItemsApp_API.Migrations
{
    public partial class OrdersTableCreated : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "PurnchaseOrderId",
                table: "PurnchaseOrderItems",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateTable(
                name: "PurnchaseOrders",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CreationDate = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PurnchaseOrders", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_PurnchaseOrderItems_PurnchaseOrderId",
                table: "PurnchaseOrderItems",
                column: "PurnchaseOrderId");

            migrationBuilder.AddForeignKey(
                name: "FK_PurnchaseOrderItems_PurnchaseOrders_PurnchaseOrderId",
                table: "PurnchaseOrderItems",
                column: "PurnchaseOrderId",
                principalTable: "PurnchaseOrders",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_PurnchaseOrderItems_PurnchaseOrders_PurnchaseOrderId",
                table: "PurnchaseOrderItems");

            migrationBuilder.DropTable(
                name: "PurnchaseOrders");

            migrationBuilder.DropIndex(
                name: "IX_PurnchaseOrderItems_PurnchaseOrderId",
                table: "PurnchaseOrderItems");

            migrationBuilder.DropColumn(
                name: "PurnchaseOrderId",
                table: "PurnchaseOrderItems");
        }
    }
}
