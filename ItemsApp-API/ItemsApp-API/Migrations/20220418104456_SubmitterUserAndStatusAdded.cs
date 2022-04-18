using Microsoft.EntityFrameworkCore.Migrations;

namespace ItemsApp_API.Migrations
{
    public partial class SubmitterUserAndStatusAdded : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<byte>(
                name: "OrderStatus",
                table: "PurnchaseOrders",
                type: "tinyint",
                nullable: false,
                defaultValue: (byte)0);

            migrationBuilder.AddColumn<int>(
                name: "SupmitterUser",
                table: "PurnchaseOrders",
                type: "int",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "OrderStatus",
                table: "PurnchaseOrders");

            migrationBuilder.DropColumn(
                name: "SupmitterUser",
                table: "PurnchaseOrders");
        }
    }
}
