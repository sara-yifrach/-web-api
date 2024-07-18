using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace chinasA.Migrations
{
    /// <inheritdoc />
    public partial class hhhhhhhhhhhhhh : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "isManager",
                table: "Costumers");

            migrationBuilder.AddColumn<string>(
                name: "role",
                table: "Costumers",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "role",
                table: "Costumers");

            migrationBuilder.AddColumn<bool>(
                name: "isManager",
                table: "Costumers",
                type: "bit",
                nullable: false,
                defaultValue: false);
        }
    }
}
