using Minio;
using Minio.DataModel;
using Microsoft.Extensions.Options;
using Minio.DataModel.Args;
using Minio.Exceptions;

namespace Api.Services.Services
{
    public class MinioService
    {
        private readonly IMinioClient _minioClient;
        private readonly string _bucketName = "uploads";
        public MinioService(IConfiguration config)
        {
            _minioClient = new MinioClient()
            .WithEndpoint(config["Minio:endpoint"])
            .WithCredentials(config["Minio:AccessKey"], config["Minio:SecretKey"])
            .WithSSL(false)
            .Build();
        }
        public async Task<string> UploadPublicFileAsync(IFormFile file)
        {
            try
            {
                bool exists = await _minioClient.BucketExistsAsync(new BucketExistsArgs().WithBucket(_bucketName));
                if (!exists)
                {
                    await _minioClient.MakeBucketAsync(new MakeBucketArgs().WithBucket(_bucketName));
                }
                using var stream = file.OpenReadStream();
                await _minioClient.PutObjectAsync(new PutObjectArgs()
                .WithBucket(_bucketName)
                .WithObject(file.FileName)
                .WithStreamData(stream)
                .WithObjectSize(file.Length)
                .WithContentType(file.ContentType));

                return $"http://localhost:9000/{_bucketName}/{file.FileName}";

            }
            catch (MinioException ex)
            {
                throw new Exception($"Erro ao enviar arquivo: {ex.Message}", ex);
            }
        }
        // public async Task<List<Item>> ListAsync(string bucketName)
        // {
        //     var items = new List<Item>();

        //     IObservable<Item> observable = _minioClient.ListObjectsAsync(
        //         new ListObjectsArgs()
        //             .WithBucket(bucketName)
        //             .WithRecursive(true)
        //     );

        //     var tcs = new TaskCompletionSource();

        //     observable.Subscribe(
        //         item => items.Add(item),
        //         ex => tcs.SetException(ex),
        //         () => tcs.SetResult()
        //     );

        //     await tcs.Task;
        //     return items;
        // }

        public async Task<Stream> DownloadAsync(string bucketName, string fileName)
        {
            var ms = new MemoryStream();

            await _minioClient.GetObjectAsync(new GetObjectArgs()
                .WithBucket(bucketName)
                .WithObject(fileName)
                .WithCallbackStream(stream => stream.CopyTo(ms))
            );

            ms.Position = 0;
            return ms;
        }

        public async Task<string> GetPresignedUrlAsync(string bucketName, string fileName, int expirySeconds = 3600)
        {
            var args = new PresignedGetObjectArgs()
                .WithBucket(bucketName)
                .WithObject(fileName)
                .WithExpiry(expirySeconds);

            return await _minioClient.PresignedGetObjectAsync(args);
        }

    }
}
