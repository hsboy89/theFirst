$folders = @(
    "src\components\common\Button",
    "src\components\common\Card",
    "src\components\common\Input",
    "src\components\layout\Sidebar",
    "src\components\layout\Header",
    "src\components\auth\LoginForm",
    "src\components\dashboard\ProfileCard",
    "src\components\dashboard\ProgressChart",
    "src\components\dashboard\RecentActivity",
    "src\components\vocabulary\VocabList",
    "src\components\vocabulary\VocabCard",
    "src\components\vocabulary\Flashcard",
    "src\pages",
    "src\hooks",
    "src\store",
    "src\types",
    "src\data",
    "src\utils"
)

foreach ($folder in $folders) {
    New-Item -ItemType Directory -Force -Path $folder | Out-Null
}

Write-Host "All folders created successfully!" -ForegroundColor Green
