using System.Threading.Tasks;
using API.Data;
using API.Hubs;
using API.Models;
using API.Repositories.Auth;
using API.Repositories.FamilyRepository;
using API.Repositories.MessageRepository;
using API.Repositories.Pictures;
using API.Repositories.Post;
using API.Repositories.RelationshipRepository;
using API.Repositories.RoomRepository;
using API.Repositories.UserRepository;
using API.Services.AuthService;
using API.Services.CommentService;
using API.Services.EmailService;
using API.Services.MessageService;
using API.Services.PictureService;
using API.Services.PostService;
using API.Services.RelationshipService;
using API.Services.RoomService;
using API.Services.UserService;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;



namespace API
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddControllers().AddNewtonsoftJson(options =>
                options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore
            );
            
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "API", Version = "v1" });
            });
            
            services.AddDbContext<DataContext>(options => options.UseSqlServer(Configuration.GetConnectionString("DefaultConnection")));
            
            services.AddIdentityCore<User>(
                options => {
                    options.Password.RequiredUniqueChars = 0;
                    options.Password.RequireUppercase = false;
                    options.Password.RequireLowercase = false;
                    options.Password.RequireDigit = false;
                    options.Password.RequireNonAlphanumeric = false;

                    options.User.RequireUniqueEmail = true;
                }   
            ).AddRoles<IdentityRole>().AddEntityFrameworkStores<DataContext>().AddDefaultTokenProviders();
             services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme).AddJwtBearer(options => {
                options.TokenValidationParameters = new TokenValidationParameters {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(System.Text.Encoding.UTF8.GetBytes(Configuration.GetSection("AppSettings:SecretKey").Value)),
                    ValidateIssuer = false,
                    ValidateAudience = false,
                    ValidIssuer = Configuration.GetSection("AppSettings:Issuer").Value,
                    ValidAudience = Configuration.GetSection("AppSettings:Audience").Value
                };

                // For signalR messages
                options.Events = new JwtBearerEvents
                {
                    OnMessageReceived = context =>
                    {
                        var accessToken = context.Request.Query["access_token"];
                        var path = context.HttpContext.Request.Path;
                        if (!string.IsNullOrEmpty(accessToken) && (path.StartsWithSegments("/hubs")))
                        {
                            context.Token = accessToken;
                        }
                        return Task.CompletedTask;
                    }
                };
            });
            services.AddAuthentication();
            services.AddAuthorization();

            services.AddAutoMapper(typeof(Startup));
            services.AddHttpContextAccessor();
            services.AddCors();
            
            services.AddSignalR();

            services.AddTransient<IAuthService, AuthService>();
            services.AddTransient<IAuthRepository, AuthRepository>();

            services.AddTransient<IUserRepository, UserRepository>();
            services.AddTransient<IUserService, UserService>();

            services.AddTransient<IFamilyRepository, FamilyRepository>();

            services.AddTransient<IRelationshipService, RelationshipService>();
            services.AddTransient<IRelationshipRepository, RelationshipRepository>();
            
            services.AddTransient<IRoomService, RoomService>();
            services.AddTransient<IRoomRepository, RoomRepository>();
            
            services.AddTransient<IMessageService, MessageService>();
            services.AddTransient<IMessageRepository, MessageRepository>();
            
            services.AddTransient<IPostService, PostService>();
            services.AddTransient<IPostRepository, PostRepository>();
            
            services.AddTransient<ICommentService, CommentService>();
            services.AddTransient<ICommentRepository, CommentRepository>();
            
            services.AddTransient<IPictureRepository, PictureRepository>();

            services.AddTransient<IPictureService, PictureService>();

            services.AddTransient<IEmailService, EmailService>();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseSwagger();
                app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "API v1"));
            }
            
            app.UseHttpsRedirection();
            
            app.UseStaticFiles();

            app.UseRouting();

            app.UseAuthentication();
            app.UseAuthorization();
            
            app.UseCors(options => {
                options.AllowAnyHeader().AllowAnyMethod().AllowCredentials().WithOrigins("http://localhost:3000");
            });

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
                endpoints.MapHub<APIHub>("/hubs");
            });
        }
    }
}
