using Microsoft.EntityFrameworkCore.Migrations;

namespace API.Migrations
{
    public partial class ChangedSeenByPropName : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "1ddaaea6-6785-45d8-a4ec-16ca5f44826a");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "450562c0-cbd6-4586-9c05-ca9c24457034");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "9eb9b890-efc8-48ce-a283-8ea3c312bd70");

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

        protected override void Down(MigrationBuilder migrationBuilder)
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
                values: new object[] { "9eb9b890-efc8-48ce-a283-8ea3c312bd70", "b3581d4e-010e-4405-a867-d690af4f76db", "SuperAdmin", "SUPERADMIN" });

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "450562c0-cbd6-4586-9c05-ca9c24457034", "60708849-0b1d-4a9f-aa54-1ad527a03322", "Admin", "ADMIN" });

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "1ddaaea6-6785-45d8-a4ec-16ca5f44826a", "8093d5fb-6fd6-44b3-959c-00af1d0f9463", "Member", "MEMBER" });
        }
    }
}
