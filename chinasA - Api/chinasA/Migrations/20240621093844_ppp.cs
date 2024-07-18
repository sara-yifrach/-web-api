using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace chinasA.Migrations
{
    /// <inheritdoc />
    public partial class ppp : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Gifts_Costumers_WinnerId",
                table: "Gifts");

            migrationBuilder.AlterColumn<int>(
                name: "WinnerId",
                table: "Gifts",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddForeignKey(
                name: "FK_Gifts_Costumers_WinnerId",
                table: "Gifts",
                column: "WinnerId",
                principalTable: "Costumers",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Gifts_Costumers_WinnerId",
                table: "Gifts");

            migrationBuilder.AlterColumn<int>(
                name: "WinnerId",
                table: "Gifts",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Gifts_Costumers_WinnerId",
                table: "Gifts",
                column: "WinnerId",
                principalTable: "Costumers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
