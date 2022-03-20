using Microsoft.EntityFrameworkCore.Migrations;

namespace API.Migrations
{
    public partial class AddedSeenPropToReaction : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
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

            migrationBuilder.AddColumn<bool>(
                name: "Seen",
                table: "Reactions",
                type: "bit",
                nullable: false,
                defaultValue: false);

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

        protected override void Down(MigrationBuilder migrationBuilder)
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

            migrationBuilder.DropColumn(
                name: "Seen",
                table: "Reactions");

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
    }
}
