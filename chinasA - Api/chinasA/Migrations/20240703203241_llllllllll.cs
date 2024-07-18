using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace chinasA.Migrations
{
    /// <inheritdoc />
    public partial class llllllllll : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "role",
                table: "Costumers");

            migrationBuilder.AddColumn<string>(
                name: "Roles",
                table: "Costumers",
                type: "nvarchar(max)",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Roles",
                table: "Costumers");

            migrationBuilder.AddColumn<string>(
                name: "role",
                table: "Costumers",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }
    }
}
