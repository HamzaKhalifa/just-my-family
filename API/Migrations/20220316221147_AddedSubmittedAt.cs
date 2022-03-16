using Microsoft.EntityFrameworkCore.Migrations;

namespace API.Migrations
{
    public partial class AddedSubmittedAt : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "1f9229e0-3d8d-46e3-a061-32c6d16fb3fd");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "499b4994-139d-4c82-a1dc-1d698a4ef209");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "a34a3cdb-f6e0-4f75-8cbc-4ae4fc419185");

            migrationBuilder.AddColumn<string>(
                name: "SubmittedAt",
                table: "Posts",
                type: "TEXT",
                nullable: true);

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "e2f2129d-64de-4c3c-9b1b-c1bfee5e369e", "af8026d4-b9a8-43b0-86ce-3debf5ced344", "SuperAdmin", "SUPERADMIN" });

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "e41c38ed-9e8a-46ad-9508-81581e470165", "8ca8ef9e-09d4-46b0-baea-b7118f3e813f", "Admin", "ADMIN" });

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "a08660fc-4eee-446f-8907-6780aa6bbb23", "5c77c275-5652-4171-bd0e-7525a78f5c2d", "Member", "MEMBER" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "a08660fc-4eee-446f-8907-6780aa6bbb23");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "e2f2129d-64de-4c3c-9b1b-c1bfee5e369e");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "e41c38ed-9e8a-46ad-9508-81581e470165");

            migrationBuilder.DropColumn(
                name: "SubmittedAt",
                table: "Posts");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "499b4994-139d-4c82-a1dc-1d698a4ef209", "d2a51b9a-f23a-43fc-9d79-54654a43d4ed", "SuperAdmin", "SUPERADMIN" });

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "1f9229e0-3d8d-46e3-a061-32c6d16fb3fd", "a927c097-1819-4c99-9c01-966a3cda363e", "Admin", "ADMIN" });

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "a34a3cdb-f6e0-4f75-8cbc-4ae4fc419185", "429887d6-9809-4770-b69f-cf8e0d2c4fd4", "Member", "MEMBER" });
        }
    }
}
