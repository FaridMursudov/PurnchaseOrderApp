using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace ItemsApp_API.Migrations
{
    public partial class SubmittedDateAdded : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTime>(
                name: "SubmittedDate",
                table: "PurnchaseOrders",
                type: "datetime2",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "SubmittedDate",
                table: "PurnchaseOrders");
        }
    }
}
