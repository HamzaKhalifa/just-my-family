using Microsoft.EntityFrameworkCore.Migrations;

namespace API.Migrations
{
    public partial class AddedSubmittedAtToReaction : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "348c9a1c-abae-4483-9485-c9cd800ecd6c");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "452f290c-997b-488e-b66f-59715515e88f");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "a6a531f7-88ba-41e4-8828-29dcfb872089");

            migrationBuilder.AddColumn<string>(
                name: "SubmittedAt",
                table: "Reactions",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "fd449ce3-ab94-43a9-a81a-687e202a3490", "d8fc9a84-3b09-44e6-90e0-b8e9f6324cb4", "SuperAdmin", "SUPERADMIN" });

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "27977e0c-2fbf-4365-abf1-b20a298cbdc5", "77719b40-fa1e-499f-8615-51b2a5fbf7e1", "Admin", "ADMIN" });

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "30d12eea-d502-4cd3-86ab-ac7fc2b75c17", "8bd7565a-ca34-4665-b38d-e310075467ff", "Member", "MEMBER" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "27977e0c-2fbf-4365-abf1-b20a298cbdc5");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "30d12eea-d502-4cd3-86ab-ac7fc2b75c17");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "fd449ce3-ab94-43a9-a81a-687e202a3490");

            migrationBuilder.DropColumn(
                name: "SubmittedAt",
                table: "Reactions");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "348c9a1c-abae-4483-9485-c9cd800ecd6c", "878316ab-dc41-4d8a-b875-79b782398653", "SuperAdmin", "SUPERADMIN" });

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "a6a531f7-88ba-41e4-8828-29dcfb872089", "81da61ab-dca0-403b-8170-80a062db83de", "Admin", "ADMIN" });

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "452f290c-997b-488e-b66f-59715515e88f", "c9a78445-7e21-413d-a151-5ddcfc58e82a", "Member", "MEMBER" });
        }
    }
}
