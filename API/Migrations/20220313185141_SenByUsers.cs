using Microsoft.EntityFrameworkCore.Migrations;

namespace API.Migrations
{
    public partial class SenByUsers : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "00180bd4-7524-4660-8e02-1be6e0af3adf");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "104efd46-20e6-406a-9fc2-9961454b83a7");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "9480328e-9009-4946-9469-c294162bf7ab");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "a444ef78-e00b-487e-b7ef-23176cb80065", "d9976554-7b98-4f3f-b245-9a92b87861f0", "SuperAdmin", "SUPERADMIN" });

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "ef465230-4161-46c4-aa27-d7b6f5bfaf91", "0cab00c2-17ba-4b90-9d7f-ec479be71fbe", "Admin", "ADMIN" });

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "ce29d6cd-7a0e-485d-9701-54a0c782872d", "7cc87886-fafb-4b31-b9f6-db1c52943c29", "Member", "MEMBER" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "a444ef78-e00b-487e-b7ef-23176cb80065");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "ce29d6cd-7a0e-485d-9701-54a0c782872d");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "ef465230-4161-46c4-aa27-d7b6f5bfaf91");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "9480328e-9009-4946-9469-c294162bf7ab", "15a10107-2294-41c0-915a-c81e94bf8ae2", "SuperAdmin", "SUPERADMIN" });

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "00180bd4-7524-4660-8e02-1be6e0af3adf", "9db9e887-f1d9-4aba-afd1-b7ff9c5c4d80", "Admin", "ADMIN" });

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "104efd46-20e6-406a-9fc2-9961454b83a7", "19ca884f-8b46-4627-803f-9a9615e3d696", "Member", "MEMBER" });
        }
    }
}
