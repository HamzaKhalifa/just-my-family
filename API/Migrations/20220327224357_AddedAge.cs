using Microsoft.EntityFrameworkCore.Migrations;

namespace API.Migrations
{
    public partial class AddedAge : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "82f4327b-332a-4eeb-837c-e213ce91aed9");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "c193fa75-6173-483e-b990-3aeb20e33f3f");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "d8b3a21f-fd5e-4ce3-9aaf-da87ae7b78af");

            migrationBuilder.AddColumn<int>(
                name: "Age",
                table: "AspNetUsers",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "1662c923-d11c-4b4c-8297-ed69e668c61b", "fc7780ae-fa8c-4b73-bdf4-b9b379c483b7", "SuperAdmin", "SUPERADMIN" });

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "3a2c7c9f-20a8-4299-9e0e-2bdf7dc22ca1", "efda92df-99cc-4731-a029-9cfbe0848d10", "Admin", "ADMIN" });

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "42f58c1a-68bd-46d4-93bb-346f854e1d56", "6a2d4447-966d-46ea-a697-8094cbb5bcf1", "Member", "MEMBER" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "1662c923-d11c-4b4c-8297-ed69e668c61b");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "3a2c7c9f-20a8-4299-9e0e-2bdf7dc22ca1");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "42f58c1a-68bd-46d4-93bb-346f854e1d56");

            migrationBuilder.DropColumn(
                name: "Age",
                table: "AspNetUsers");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "d8b3a21f-fd5e-4ce3-9aaf-da87ae7b78af", "1e1c1a60-cca5-47c4-b10e-232961a27977", "SuperAdmin", "SUPERADMIN" });

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "82f4327b-332a-4eeb-837c-e213ce91aed9", "32c248bc-94eb-4604-a637-7a657e411403", "Admin", "ADMIN" });

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "c193fa75-6173-483e-b990-3aeb20e33f3f", "f99d7590-42b2-4c53-a2f9-8328b51adfbd", "Member", "MEMBER" });
        }
    }
}
